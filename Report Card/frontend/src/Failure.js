
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './failure.css';
import Home from './Home.js';

function Failure() {
  const root=ReactDOM.createRoot(document.getElementById('root'));
  const handlehome = () => {
    root.render(
      <Router>
        <Home />
      </Router>
    );
  };

  return (
    <div className="failure-container">
      <h1 className="shaking-heading">Sorry, Invalid Credentials!</h1>
      <h1 className="failure-message">Login Failed</h1>
      <h1 className="retry-button" onClick={handlehome}>
        <button className="btn btn-success">Try Again</button>
      </h1>
    </div>
  );
}

export default Failure;
