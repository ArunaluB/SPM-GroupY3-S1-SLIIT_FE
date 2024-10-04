import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
function Home() {
  return (
    <div>
      <h1 className="title2">Welcome to the Programming Quiz!</h1>
      <Link to="/gotoquiz" className="start-button">
        Start Quiz
      </Link>
      <div  className="home-background"></div>
    </div>
  );
}

export default Home;
