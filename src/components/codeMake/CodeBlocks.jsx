// src/components/codeMake/CodeBlocks.jsx
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import styles from '../../pages/BasePage.module.css';

const BLOCKS = [
  { id: 1, label: 'For', type: 'preset' },
  { id: 2, label: 'If', type: 'preset' },
  { id: 3, label: 'While', type: 'preset' },
  { id: 4, label: 'Switch', type: 'preset' },
  { id: 5, label: 'Text Input', type: 'input' },
  { id: 6, label: 'TRUE', type: 'constant' },
  { id: 7, label: 'FALSE', type: 'constant' },
  { id: 8, label: 'AND', type: 'operator' },
  { id: 9, label: 'OR', type: 'operator' },
  { id: 10, label: 'NOT', type: 'operator' },
  { id: 11, label: '+', type: 'operator' },
  { id: 12, label: '-', type: 'operator' },
  { id: 13, label: '*', type: 'operator' },
  { id: 14, label: '/', type: 'operator' },
  { id: 15, label: '%', type: 'operator' },
  { id: 16, label: '//', type: 'operator' },
  { id: 17, label: '**', type: 'operator' },
  { id: 18, label: '^', type: 'operator' },
  { id: 19, label: '<', type: 'operator' },
  { id: 20, label: '>', type: 'operator' },
  { id: 21, label: '<=', type: 'operator' },
  { id: 22, label: '>=', type: 'operator' },
  { id: 23, label: '==', type: 'operator' },
];

function CodeBlocks() {
  return (
    <div className={styles.codeBlocksContainer}>
      {BLOCKS.map((block) => (
        <BlockItem key={block.id} block={block} />
      ))}
    </div>
  );
}

function BlockItem({ block }) {
  const [inputValue, setInputValue] = useState('');

  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { ...block, inputValue, isNew: true },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      ref={drag}
      className={`${styles.codeBlock} ${block.type === 'input' ? styles.inputBlock : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      {block.type === 'input' ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text"
          className={styles.blockInput}
        />
      ) : (
        block.label
      )}
    </div>
  );
}

export default CodeBlocks;