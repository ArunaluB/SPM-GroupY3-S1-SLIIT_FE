import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Quiz.css';


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const questions = [
    {
      question: "What is the correct way to declare a variable in Java?",
      options: ["int 1x = 10;", "int x = 10;", "int x: 10;", "int x = 10"],
      correctAnswer: "int x = 10;"
    },
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "Class", "create", "new"],
      correctAnswer: "class"
    },
    {
      question: "Which of these is not a Java keyword?",
      options: ["static", "Boolean", "void", "private"],
      correctAnswer: "Boolean"
    },
    {
      question: "What is the default value of a boolean variable in Java?",
      options: ["true", "false", "0", "1"],
      correctAnswer: "false"
    },
    {
      question: "What is the size of int variable in Java?",
      options: ["8 bits", "16 bits", "32 bits", "64 bits"],
      correctAnswer: "32 bits"
    },
    {
      question: "Which of the following is a valid declaration of an array in Java?",
      options: ["int arr[];", "int arr;", "int arr[5];", "int arr{};"],
      correctAnswer: "int arr[];"
    },
    {
      question: "What is the main method signature in Java?",
      options: ["public static void main(String args[])", "public void main(String args[])", "void main(String args[])", "public static void main(String[] args)"],
      correctAnswer: "public static void main(String[] args)"
    },
    {
      question: "Which of the following is used to handle exceptions in Java?",
      options: ["try-catch", "try-except", "try-finally", "throw-catch"],
      correctAnswer: "try-catch"
    },
    {
      question: "What is the keyword used to inherit a class in Java?",
      options: ["extends", "inherits", "implements", "uses"],
      correctAnswer: "extends"
    },
    {
      question: "Which of the following is not a primitive data type in Java?",
      options: ["int", "boolean", "String", "char"],
      correctAnswer: "String"
    },
    {
      question: "Which operator is used to compare two values in Java?",
      options: ["==", "=", "equals", "compare"],
      correctAnswer: "=="
    },
    {
      question: "Which of the following statements is true about constructors in Java?",
      options: ["A constructor can have any return type", "A constructor is called when an object is created", "A constructor cannot be overloaded", "Constructors can be private"],
      correctAnswer: "A constructor is called when an object is created"
    },
    {
      question: "What is the output of the following code? System.out.println('A' + 'B');",
      options: ["AB", "66", "Error", "A + B"],
      correctAnswer: "66"
    },
    {
      question: "What does the 'super' keyword refer to in Java?",
      options: ["Parent class", "Current class", "Sub-class", "None of the above"],
      correctAnswer: "Parent class"
    },
    {
      question: "Which of the following is a characteristic of Java?",
      options: ["It is a low-level programming language", "It is platform-independent", "It requires a compiler", "It is not object-oriented"],
      correctAnswer: "It is platform-independent"
    },
    {
      question: "What is the primary purpose of the Java Collections Framework?",
      options: ["To store and manipulate groups of objects", "To provide a database connection", "To handle exceptions", "To improve performance"],
      correctAnswer: "To store and manipulate groups of objects"
    },
    {
      question: "Which of the following is not a part of the Java Collections Framework?",
      options: ["List", "Set", "Map", "Array"],
      correctAnswer: "Array"
    },
    {
      question: "What is the correct syntax for a for loop in Java?",
      options: ["for (i = 0; i < 10; i++) {}", "for (i < 10; i++) {}", "for (int i = 0; i < 10) {}", "for (int i = 0; i < 10; i+1) {}"],
      correctAnswer: "for (i = 0; i < 10; i++) {}"
    },
    {
      question: "What keyword is used to declare a constant variable in Java?",
      options: ["const", "final", "static", "constant"],
      correctAnswer: "final"
    },
    {
      question: "Which of the following is the correct way to call a method in Java?",
      options: ["methodName();", "call methodName();", "methodName{}", "methodName[]"],
      correctAnswer: "methodName();"
    },
    {
      question: "What does 'static' mean in Java?",
      options: ["It can only be accessed within the same class", "It can be accessed without creating an instance", "It is only for methods", "It is a variable type"],
      correctAnswer: "It can be accessed without creating an instance"
    },
    {
      question: "What does the term 'object-oriented' mean in Java?",
      options: ["It focuses on data rather than functions", "It allows for the creation of objects", "It is a programming paradigm based on objects", "All of the above"],
      correctAnswer: "All of the above"
    }  
];

const shuffledQuestions = shuffleArray(questions).map((q) => ({
  ...q,
  options: shuffleArray(q.options),
}));

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          handleNext();
          return 30; 
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNext = useCallback(() => {
    setSelectedAnswers((prev) => [
      ...prev,
      {
        question: shuffledQuestions[currentQuestion].question,
        selectedAnswer: selectedOption,
        correctAnswer: shuffledQuestions[currentQuestion].correctAnswer,
      },
    ]);

    if (selectedOption === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30); 
    } else {
      navigate('/result', { state: { score, selectedAnswers } });
    }
  }, [currentQuestion, selectedOption, score, selectedAnswers, navigate]);

  return (
    <div className="quiz-header">
    <h1 className="quiz-name">Basic Programming Quiz</h1>
    <div className="quiz">
        <h2 className="question">{shuffledQuestions[currentQuestion].question}</h2>
        <ul className="options">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
                <li key={option} className="option">
                    <input
                        type="radio"
                        id={`option-${index}`}
                        name="option"
                        value={option}
                        onChange={() => handleOptionChange(option)}
                        checked={selectedOption === option}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                </li>
            ))}
        </ul>
        <div className="timer">Time Left: {timeLeft} seconds</div>
        <button onClick={handleNext} className="next-button">
            {currentQuestion === shuffledQuestions.length - 1 ? 'Submit' : 'Next'}
        </button>
    </div>
</div>

  );
}

export default Quiz;
