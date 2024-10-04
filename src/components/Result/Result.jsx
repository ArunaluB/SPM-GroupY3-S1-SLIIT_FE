import React from 'react';
import { useLocation, Link } from 'react-router-dom'; 
import './Result.css'; 

function Result() {
  const location = useLocation();
  const { score, selectedAnswers } = location.state;

  return (
    <div className="result-container">
      <h2>Your Score: {score} / 30</h2>
      <h3>Answers:</h3>
      <ul className="answers-list">
        {selectedAnswers.map((answer, index) => {
          const isCorrect = answer.selectedAnswer === answer.correctAnswer;
          const isEmpty = !answer.selectedAnswer; 

          return (
            <li key={index}>
              <div className="answer-content">
                <strong className="question-item">Question:</strong> {answer.question}<br />
                <strong className="answer-item">Your Answer:</strong>
                <span className={isCorrect ? "correct-answer" : "user-answer"}>
                  {answer.selectedAnswer || "No Answer"}
                </span>
              </div>
              <span className={`mark ${isCorrect ? "right-mark" : (isEmpty ? "false-mark" : "false-mark")}`}>
                {isCorrect ? "✔️" : (isEmpty ? "❌" : "❌")}
              </span>
            </li>
          );
        })}
      </ul>
      {/* Button to go back to Home */}
      <Link to="/" className="home-button">
        Go Home
      </Link>
    </div>
  );
}

export default Result;
