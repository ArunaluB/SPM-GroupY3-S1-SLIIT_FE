import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
function Home() {
  return (
    <div className="home-background">
      <h1 className="title">Welcome to the Programming Quiz!</h1>
    
      <Link to="/gotoquiz" className="start-button">
        Start Quiz
      </Link>
    </div>
  );
}

export default Home;
