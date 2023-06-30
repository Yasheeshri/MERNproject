import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import StudentRegistration from './StudentRegistration';
import StudentLogin from './StudentLogin';
import './Route.css'; // Import CSS file for styling

const StudentRoute = () => {
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
    <div>
      <h1 className="heading" style={{"marginTop": '120px'}}>Select The Action To Proceed Further</h1>
      <div className="student-buttons">
        <div className="button-container">
          <Button
            variant="primary"
            onClick={handleRegistrationClick}
            className="student-button  btn-hover btn btn-primary"
            
          >
            Student Registration
          </Button>
          <div>  <span>&nbsp;</span></div>
        </div>
        <div className="button-container">
          <Button
            variant="success"
            onClick={handleLoginClick}
            className="student-button "
            
          >
            Student Login
          </Button>
        </div>
      </div>

      {showRegistration && <StudentRegistration />}
      {showLogin && <StudentLogin />}
    </div>
  );
};

export default StudentRoute;
