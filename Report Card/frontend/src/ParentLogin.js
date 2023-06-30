import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ParentDashboard from './ParentDashboard.js';
import Failure from './Failure.js';
import Home from './Home.js';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './eye.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import ParentRegistration from './ParentRegistration.js';
const ParentLogin = () => {
  const [pid, setPid] = useState('');
  const [ppass, setPpass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const root=ReactDOM.createRoot(document.getElementById('root'));
  const handlePid=(evt)=>{
    setPid(evt.target.value);
} 

const handlePpass=(evt)=>{
  setPpass(evt.target.value);
} 


const handleTogglePassword = () => {
  setShowPassword(!showPassword);
};  



  const handleSubmit = (evt) => {
    evt.preventDefault();
    const root = ReactDOM.createRoot(document.getElementById('root'));
    axios.get(`http://127.0.0.1:5000/parent/parentlogin/${pid}/${ppass}`)
      .then(res => {
        if (res.data) {
          const parentData = res.data; // Assuming the fetched data is an object containing all the fields
          if (parentData.parentstatus === "Inactive") {
            alert("Account is Inactive");
            // Perform necessary actions for inactive account
            
          } else {
            alert(`Welcome ${pid}`);
            root.render(
              <React.StrictMode>
                <ParentDashboard data={parentData} />
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
        <ParentRegistration/>
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
    <div className="container" style={{ backgroundColor: 'pink', color: 'black', marginTop: '6px' }}>
      <h2 className="text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Parent Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="childUserId">Child User ID:</label>
          <input
            type="text"
            id="childUserId"
            value={pid}
            onChange={handlePid}
            placeholder="Enter Your Child's UserId"
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
        value={ppass}
        onChange={handlePpass}
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

export default ParentLogin;
