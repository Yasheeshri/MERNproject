

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import FacultyLogin from './FacultyLogin.js';
import Home from './Home.js';
import UploadMarksheet from './UploadMarksheet.js';
import UpdateMarksheet from './UpdateMarksheet.js';
import DeleteMarksheet from './DeleteMarksheet.js';
import FacultyDetail from './FacultyDetail.js';
import Footer from './Footer.js';
import university from './university.jpg';
import './FacultyDashBoardNav.css';

const FacultyDashboard = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const root = ReactDOM.createRoot(document.getElementById('root'));


  useEffect(() => {
    const image = new Image();
    image.src = university;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, []);




  const handlefacultydetail = () => {
    root.render(
      <React.StrictMode>
        <FacultyDetail facultyDetails={props.data} />
      </React.StrictMode>
    );
  };

  const handlesignout = () => {
    alert(`Successfully Logged Out`);
    root.render(
      <React.StrictMode>
        <FacultyLogin />
      </React.StrictMode>
    );
  };

  const handleupload = () => {
    root.render(
      <React.StrictMode>
        <UploadMarksheet />
      </React.StrictMode>
    );
  };

  const handleupdate = () => {
    root.render(
      <React.StrictMode>
        <UpdateMarksheet />
      </React.StrictMode>
    );
  };

  const handledelete = () => {
    root.render(
      <React.StrictMode>
        <DeleteMarksheet />
      </React.StrictMode>
    );
  };

  return (
    <div  style={{ height: '100vh' ,"fontFamily":"cursive"}}>
       {imageLoaded ? (
      <Router>
        <div style={{ backgroundColor: '#FF69B4', color: 'whitesmoke', textAlign: 'center' }}>
          <h1 style={{ color: 'whitesmoke', fontFamily: 'cursive' }}>
           Welcome To The Faculty Section
          </h1>
          <div style={{ background: 'pink', padding: '10px' }}>
            <Link to="/" target="_blank" className="link" style={{ textDecoration: 'none', margin: '0 15px' }}>
              Home
            </Link>
            <Link to="/facultydetail" className="link" onClick={handlefacultydetail} style={{ textDecoration: 'none', margin: '0 15px' }}>
              Faculty Details
            </Link>
            <Link to="/upload" className="link" onClick={handleupload} style={{ textDecoration: 'none', margin: '0 15px' }}>
              Upload Marksheet
            </Link>
            <Link to="/update" className="link" onClick={handleupdate} style={{ textDecoration: 'none', margin: '0 15px' }}>
              Update Marksheet
            </Link>
            <Link to="/delete" className="link" onClick={handledelete} style={{ textDecoration: 'none', margin: '0 15px' }}>
              Delete Marksheet
            </Link>
            <button className="btn btn-danger" onClick={handlesignout} style={{ padding: '4px 8px', fontSize: '12px', marginLeft: '20px' }}>
              Sign Out
            </button>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/facultydetail" element={<FacultyDetail />} />
            <Route path="/upload" element={<UploadMarksheet />} />
            <Route path="/update" element={<UpdateMarksheet />} />
            <Route path="/delete" element={<DeleteMarksheet />} />
          </Routes>
        </div>
      </Router>
 ) : null}
       <div style={{ backgroundColor: 'lightgreen', height: '100%', width: '100%' }}>
        {imageLoaded ? (
          <img src={university} alt="University" className="img-fluid"
          style={{ height: '100%', width: '100%' }} />
          ) : null}
          </div>
          <div style={{ marginTop: '-10px' }}>
          <Footer />
          </div>
          </div>
          );
          };

export default FacultyDashboard;















































































