// src/components/codeMake/WorkbenchBlock.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { X } from 'lucide-react';
import styles from '../../pages/BasePage.module.css';

const GRID_SIZE = 100;

function WorkbenchBlock({ id, block, onBlockRemove, onBlockClick, x, y, moveBlock }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`${styles.workbenchBlock} ${block.type === 'input' ? styles.workbenchBlockInput : ''}`}
      style={{
        position: 'absolute',
        left: `${x * GRID_SIZE}px`,
        top: `${y * GRID_SIZE}px`,
        width: `${GRID_SIZE}px`,
        height: `${GRID_SIZE}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
      }}
      onClick={() => onBlockClick(block)}
    >
      {block.type === 'input' ? (
        <input
          type="text"
          value={block.inputValue || ''}
          readOnly
          className={styles.blockInput}
        />
      ) : (
        block.label
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onBlockRemove(id);
        }} 
        className={styles.removeButton}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default WorkbenchBlock;