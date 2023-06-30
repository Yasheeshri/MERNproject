import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import FacultyDashboard from './FacultyDashboard.js';
import Home from './Home.js';
import Failure from './Failure.js';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './eye.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import FacultyRegistration from './FacultyRegistration.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
const FacultyLogin = () => {
  const [fid, setFid] = useState('');
  const [fpass, setFpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleFid=(evt)=>{
    setFid(evt.target.value);
} 

const handleFpass=(evt)=>{
  setFpass(evt.target.value);
} 
 
const handleTogglePassword = () => {
  setShowPassword(!showPassword);
};  






const handleSubmit = (evt) => {
  evt.preventDefault();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  axios.get(`http://127.0.0.1:5000/faculty/facultylogin/${fid}/${fpass}`)
    .then(res => {
      if (res.data) {
        const facultyData = res.data; // Assuming the fetched data is an object containing all the fields
        if (facultyData.facultystatus === "Inactive") {
          alert("Account is Inactive");
          // Perform necessary actions for inactive account
          
        } else {
          alert(`Welcome ${fid}`);
          root.render(
            <React.StrictMode>
              <FacultyDashboard data={facultyData} />
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
















const handleregister=()=>{
  root.render(
    <React.StrictMode>
      <FacultyRegistration/>
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
    <div className="container" style={{ backgroundColor: 'cyan', color: 'whitesmoke', marginTop: '6px' }}>
      <h2 className="text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Faculty Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="UserId">User ID:</label>
          <input
            type="text"
            id="UserId"
            value={fid}
            onChange={ handleFid}
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
        value={fpass}
        onChange={handleFpass}
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
          <button type="submit" className="btn btn-warning" onClick={handleregister}>
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

export default FacultyLogin;




















































































