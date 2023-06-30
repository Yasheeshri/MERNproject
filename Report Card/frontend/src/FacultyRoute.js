import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FacultyRegistration from './FacultyRegistration';
import FacultyLogin from './FacultyLogin';
import './Route.css'; // Import CSS file for styling

const FacultyRoute = () => {
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
    <div className="faculty-route-container">
      <h1 className="heading" style={{ "marginTop": '120px'}}>Select The Action To Proceed Further</h1>
<center>
      <div className="faculty-buttons">
        <Button
          variant="primary"
          onClick={handleRegistrationClick}
          className="faculty-button  btn btn-hover"
          
        >
          Faculty Registration
        </Button>
        <span>&nbsp;</span>
      <div>  <span>&nbsp;</span></div>
        
        <Button
          variant="success"
          onClick={handleLoginClick}
          className="faculty-button btn-success"
          
        >
          Faculty Login
        </Button>
      </div>

      </center>
      {showRegistration && <FacultyRegistration />}
      {showLogin && <FacultyLogin />}
    </div>
  );
};

export default FacultyRoute;
