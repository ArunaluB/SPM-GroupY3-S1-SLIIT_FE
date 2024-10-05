
// src/components/InfoSection.js
import React from 'react';
import styles from '../../pages/BasePage.module.css'; // Import the CSS module


const blockInfo = {
    "For": {
        description: "A for loop is used to repeat a block of code a specific number of times. It's commonly used when the number of iterations is known beforehand. The loop works by iterating over a sequence (like a list, range, or string) and executing the code block inside it for each item in the sequence.",
        syntax: "for variable in sequence:\n    # Code to be executed",
        video: "https://www.youtube.com/embed/b4DPj0XAfSg", // Replace with actual YouTube video ID
    },
    "If": {
        description: "An 'if statement' executes a block of code based on a condition. If the condition is True, the code inside the block will be executed.",
        syntax: "if condition:\n    # Code to be executed",
        video: "https://www.youtube.com/embed/kO3eEn_hgQc", // Replace with actual YouTube video ID
    },

    "While": {
        description: "A while loop repeatedly executes a block of code as long as a given condition is true. It’s used when the number of iterations is not known beforehand and depends on a condition.",
        syntax: "while condition:\n    # Code to be executed",
        video: "https://www.youtube.com/embed/ufFAFx5Qn3w",
    },
    "Switch": {
        description: "A switch statement allows the execution of different code blocks based on the value of a variable. It’s commonly used as an alternative to multiple 'if' statements.",
        syntax: "switch (expression) {\n    case value1:\n        // Code to be executed\n        break;\n    case value2:\n        // Code to be executed\n        break;\n    default:\n        // Code to be executed\n}",
        video: "https://www.youtube.com/embed/tjd8fQw5HTA",
    },
    "Text Input": {
        description: "Text Input block allows the user to input text. It can be used to capture user input in forms or interactive applications.",
        syntax: "<input type='text' placeholder='Enter text'>",
    },
    "TRUE": {
        description: "The TRUE block represents a boolean true value. It can be used in logical operations and conditions.",
        syntax: "TRUE",
        video: "https://www.youtube.com/embed/WGQRInmOBM8",
    },
    "FALSE": {
        description: "The FALSE block represents a boolean false value. It can be used in logical operations and conditions.",
        syntax: "FALSE",
        video: "https://www.youtube.com/embed/WGQRInmOBM8",
    },
    "AND": {
        description: "The AND block represents a logical AND operation. It evaluates to TRUE if both operands are TRUE.",
        syntax: "operand1 AND operand2",
        video: "https://www.youtube.com/embed/WGQRInmOBM8",
    },
    "OR": {
        description: "The OR block represents a logical OR operation. It evaluates to TRUE if at least one of the operands is TRUE.",
        syntax: "operand1 OR operand2",
        video: "https://www.youtube.com/embed/WGQRInmOBM8",
    },
    "NOT": {
        description: "The NOT block represents a logical NOT operation. It inverts the boolean value of the operand.",
        syntax: "NOT operand",
        video: "https://www.youtube.com/embed/WGQRInmOBM8",
    },
    "+": {
        description: "The + block represents addition. It adds two operands.",
        syntax: "operand1 + operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "-": {
        description: "The - block represents subtraction. It subtracts the second operand from the first.",
        syntax: "operand1 - operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "*": {
        description: "The * block represents multiplication. It multiplies two operands.",
        syntax: "operand1 * operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "/": {
        description: "The / block represents division. It divides the first operand by the second.",
        syntax: "operand1 / operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "%": {
        description: "The % block represents modulus. It returns the remainder of dividing the first operand by the second.",
        syntax: "operand1 % operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "//": {
        description: "The // block represents integer division. It divides the first operand by the second and returns the integer part of the result.",
        syntax: "operand1 // operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "**": {
        description: "The ** block represents exponentiation. It raises the first operand to the power of the second operand.",
        syntax: "operand1 ** operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "^": {
        description: "The ^ block represents bitwise XOR operation. It performs a bitwise exclusive OR operation between two operands.",
        syntax: "operand1 ^ operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "<": {
        description: "The < block represents the less than comparison operator. It checks if the first operand is less than the second.",
        syntax: "operand1 < operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    ">": {
        description: "The > block represents the greater than comparison operator. It checks if the first operand is greater than the second.",
        syntax: "operand1 > operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "<=": {
        description: "The <= block represents the less than or equal to comparison operator. It checks if the first operand is less than or equal to the second.",
        syntax: "operand1 <= operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    ">=": {
        description: "The >= block represents the greater than or equal to comparison operator. It checks if the first operand is greater than or equal to the second.",
        syntax: "operand1 >= operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
    "==": {
        description: "The == block represents equality comparison. It checks if two operands are equal.",
        syntax: "operand1 == operand2",
        video: "https://www.youtube.com/embed/PaHpU7-BNaU",
    },
};

function InfoSection({ selectedBlock }) {
    if (!selectedBlock) {
      return <p className={styles.infoParagraph}>Please select a block to see more information.</p>;
    }
  
    const blockDetails = blockInfo[selectedBlock.label];
  
    return (
      <div className={styles.infoSection}>
        <h3 className={styles.infoHeader}>{selectedBlock.label}</h3>
        <p className={styles.infoParagraph}>{blockDetails ? blockDetails.description : "No description available."}</p>
  
        {blockDetails && blockDetails.syntax && (
          <>
            <h4 className={styles.infoHeader}>Syntax:</h4>
            <pre className={styles.syntaxBlock}>
              <code>{blockDetails.syntax}</code>
            </pre>
          </>
        )}
  
        {blockDetails && blockDetails.video && (
          <>
            <h4 className={styles.infoHeader}>Video Tutorial:</h4>
            <iframe
              className={styles.videoPlayer}
              src={blockDetails.video}
              title={`${selectedBlock.label} Tutorial`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </>
        )}
      </div>
    );
  }
  
  export default InfoSection;