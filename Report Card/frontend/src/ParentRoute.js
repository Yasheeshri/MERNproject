import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ParentRegistration from './ParentRegistration';
import ParentLogin from './ParentLogin';
import './Route.css'; // Import CSS file for styling

const ParentRoute = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistration(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowRegistration(false);
    setShowLogin(true);
  };

  return (
    <div className="parent-route-container">
      <h1 className="heading" style={{"marginTop": '120px'}}>Select The Action To Proceed Further</h1>
<center>
      <div className="parent-buttons">
        <Button
          variant="primary"
          onClick={handleRegistrationClick}
          className="parent-button"
          
        >
          Parent Registration
        </Button>
        <span>&nbsp;</span>
        <div>  <span>&nbsp;</span></div>
        <Button
          variant="success"
          onClick={handleLoginClick}
          className="parent-button "
          
        >
          Parent Login
        </Button>
      </div>
      </center>
      {showRegistration && <ParentRegistration />}
      {showLogin && <ParentLogin />}
    </div>
  );
};

export default ParentRoute;
