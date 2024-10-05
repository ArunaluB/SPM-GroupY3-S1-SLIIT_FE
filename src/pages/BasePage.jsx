// src/pages/BasePage.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CodeBlocks from '../components/codeMake/CodeBlocks';
import Workbench from '../components/codeMake/Workbench';
import InfoSection from '../components/codeMake/InfoSection';
import styles from './BasePage.module.css'; // Import the CSS module

function BasePage() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [workbenchBlocks, setWorkbenchBlocks] = useState([]);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handleBlockRemove = (id) => {
    setWorkbenchBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
  };

  const handleBlockAdd = (block) => {
    setWorkbenchBlocks(prevBlocks => [...prevBlocks, { ...block, id: Date.now() }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.appContainer}>
        <div className={styles.codeBlocks}>
          <h2 className={styles.codeBlocksHeader}>Code Blocks</h2>
          <CodeBlocks onBlockDrag={handleBlockAdd} />
        </div>
        <div className={styles.workbench}>
          <h2 className={styles.workbenchHeader}>Workbench</h2>
          <Workbench
            blocks={workbenchBlocks}
            onBlockRemove={handleBlockRemove}
            onBlockClick={handleBlockClick}
            setWorkbenchBlocks={setWorkbenchBlocks}
          />
        </div>
        <div className={styles.infoSection}>
          <h2 className={styles.infoHeader}>Block Info</h2>
          <InfoSection selectedBlock={selectedBlock} />
        </div>
      </div>
    </DndProvider>
  );
}

export default BasePage;