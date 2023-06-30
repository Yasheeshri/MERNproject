import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Failure from './Failure.js';
import AdminDashboard from './AdminDashboard.js';
import Home from './Home.js';
import axios from 'axios';
import './eye.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const AdminLogin = () => {
  const [aid, setAid] = useState('');
  const [apass, setApass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const root=ReactDOM.createRoot(document.getElementById('root'));


  const handleAid=(evt)=>{
    setAid(evt.target.value);
} 

const handleApass=(evt)=>{
  setApass(evt.target.value);
} 


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };  



  const handleSubmit =  (e) => {
    e.preventDefault();
   

axios.get(`http://127.0.0.1:5000/admin/adminlogin/${aid}/${apass}`)
.then(res => {
  if (res.data) {
    // alert(`Welcome ${aid}`);
    root.render(
      <React.StrictMode>
          <AdminDashboard name={aid}/>
      </React.StrictMode>
  );
    // Perform necessary actions after successful login
  } else {
    // alert("Access Denied");
    root.render(
      <React.StrictMode>
        <Failure/>
      </React.StrictMode>
    );
    // Perform necessary actions for failed login
  }
})
.catch(err => {
  // alert("Something Went Wrong");
  // console.log(`${aid}, ${apass}`);
  root.render(
    <React.StrictMode>
        <Failure/>
    </React.StrictMode>
  );
  // Handle the error condition
});

console.log({ aid, apass });

  };

  const handlehome=()=>{
    
    root.render(
      <Router>
      <Home />
    </Router>
    );
  }

 


  return (
    <div className="container" style={{marginTop:"120px"}}>
      <h2 className="text-center" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',color:"rebeccapurple" ,"fontFamily":"cursive"}}>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="adminId">Admin ID:</label>
          <input
            type="text"
            id="adminId"
            value={aid}
            onChange={handleAid}
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
        value={apass}
        onChange={handleApass}
        className="form-control"
        required
      />
      <span className="password-toggle-icon" onClick={handleTogglePassword}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
      </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Login
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

export default AdminLogin;


















