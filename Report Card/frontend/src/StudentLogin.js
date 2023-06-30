import React, { useState } from 'react';
import StudentRegistration from './StudentRegistration.js';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import Failure from './Failure.js';
import Home from './Home.js';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './eye.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const StudentLogin = () => {
  const [sid, setSid] = useState('');
  const [spass, setSpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const root=ReactDOM.createRoot(document.getElementById('root'));

  const handleSid=(evt)=>{
    setSid(evt.target.value);
} 

const handleSpass=(evt)=>{
  setSpass(evt.target.value);
} 

const handleTogglePassword = () => {
  setShowPassword(!showPassword);
};  



const handleSubmit = (evt) => {
  evt.preventDefault();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  axios.get(`http://127.0.0.1:5000/student/studentlogin/${sid}/${spass}`)
    .then(res => {
      if (res.data) {
        const studentData = res.data; // Assuming the fetched data is an object containing all the fields
        if (studentData.studentstatus === "Inactive") {
          alert("Account is Inactive");
          // Perform necessary actions for inactive account
          
        } else {
          alert(`Welcome ${sid}`);
          root.render(
            <React.StrictMode>
              <StudentDashboard data={studentData} />
            </React.StrictMode>
          );
          // Perform necessary actions after successful login
        }
      } else {
        root.render(
          <React.StrictMode>
            <Failure />
          </React.StrictMode>
        );
        // Perform necessary actions for failed login
      }
    })
    .catch(err => {
      root.render(
        <React.StrictMode>
          <Failure />
        </React.StrictMode>
      );
      // Handle the error condition
    });
};

//


const handleregister=()=>{
  root.render(
    <React.StrictMode>
      <StudentRegistration/>
    </React.StrictMode>
  );

  }
  const handlehome=()=>{
    root.render(
      <Router>
      <Home />
    </Router>
    );
  }


  return (
    <div className="container" style={{"backgroundColor":"cornflowerblue","color":"whitesmoke", marginTop:"6px"}}>
      <h2 className="text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'  }}>Student Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={sid}
            onChange={handleSid}
            placeholder="Enter Your UserId"
            className="form-control"
            required
          />
         </div>
      




<div className="form-group"> 
<label htmlFor="password">Password:</label>
    <div className="password-input-wrapper">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        value={spass}
        onChange={handleSpass}
        placeholder="Enter Your Password"
        className="form-control"
        required
      />
      <span className="password-toggle-icon" onClick={handleTogglePassword}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
      </div>


        
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={handleregister}>
            Register
          </button>
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary" onClick={handlehome}>
            Home
          </button>
        </div>
       
      </form>
      
    </div>
  );
};

export default StudentLogin;













