// src/components/codeMake/Workbench.jsx
import React, { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WorkbenchBlock from './WorkbenchBlock';
import styles from '../../pages/BasePage.module.css';

const GRID_SIZE = 100;

function Workbench({ blocks, onBlockRemove, onBlockClick, setWorkbenchBlocks }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const moveBlock = useCallback((id, x, y) => {
    setWorkbenchBlocks(prevBlocks =>
      prevBlocks.map(block =>
        block.id === id ? { ...block, x, y } : block
      )
    );
  }, [setWorkbenchBlocks]);

  const [, drop] = useDrop({
    accept: 'BLOCK',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const workbenchRect = document.querySelector(`.${styles.workbench}`).getBoundingClientRect();
      
      if (offset) {
        const x = Math.floor((offset.x - workbenchRect.left) / GRID_SIZE);
        const y = Math.floor((offset.y - workbenchRect.top) / GRID_SIZE);

        if (item.isNew) {
          const newBlock = { ...item, id: Date.now(), x, y };
          setWorkbenchBlocks(prevBlocks => [...prevBlocks, newBlock]);
        } else {
          moveBlock(item.id, x, y);
        }
      }
      return { moved: true };
    },
  });

  const convertBlocksToCode = (blocks) => {
    const lines = {};

    blocks.forEach(block => {
      if (!lines[block.y]) {
        lines[block.y] = [];
      }
      lines[block.y].push({ x: block.x, label: block.type === 'input' ? block.inputValue || '' : block.label });
    });

    const sortedLines = Object.keys(lines)
      .sort((a, b) => a - b)
      .map(y => lines[y].sort((a, b) => a.x - b.x));

    const codeLines = sortedLines.map(line => {
      const maxX = Math.max(...line.map(block => block.x));
      const codeLine = Array(maxX + 1).fill('');
      line.forEach(block => {
        codeLine[block.x] = block.label;
      });
      return codeLine.join(' ').trim(); 
    });

    return codeLines.join('\n');
  };

  const handleCheckCode = async () => {
    const code = convertBlocksToCode(blocks);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/check-code', { code });
      navigate('/output', { state: { code: response.data.response } });
    } catch (error) {
      setError('An error occurred while checking the code.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div ref={drop} className={styles.workbench} style={{ position: 'relative', width: '100%', height: '550px', border: '1px solid #ccc' }}>
        {blocks.length === 0 ? (
          <p className={styles.infoParagraph}>Drag and drop blocks here to create your code</p>
        ) : (
          blocks.map((block) => (
            <WorkbenchBlock
              key={block.id}
              id={block.id}
              block={block}
              onBlockRemove={onBlockRemove}
              onBlockClick={onBlockClick}
              x={block.x}
              y={block.y}
              moveBlock={moveBlock}
            />
          ))
        )}
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button onClick={handleCheckCode} className={styles.checkButton} disabled={loading}>
        {loading ? 'Checking...' : 'Check Code'}
      </button>
    </div>
  );
}

export default Workbench;