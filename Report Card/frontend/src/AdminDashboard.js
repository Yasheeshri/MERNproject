
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import AdminLogin from './AdminLogin.js';
import Home from './Home';
import ManageStudent from './ManageStudent.js';
import ManageFaculty from './ManageFaculty.js';
import ManageParent from './ManageParent.js';
import Footer from './Footer.js';
import faculty from './faculty.jpg';
import './admindashboard.css';

const AdminDashboard = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const root = ReactDOM.createRoot(document.getElementById
    ('root'));

  useEffect(() => {
    const image = new Image();
    image.src = faculty;
    image.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  const handlesignout = () => {
    alert(`Successfully Logged Out`);
    root.render(
      <React.StrictMode>
        <AdminLogin />
      </React.StrictMode>
    );
  };

  const handlestudent = () => {
    root.render(
      <React.StrictMode>
        <ManageStudent />
      </React.StrictMode>
    );
  };

  const handlefaculty = () => {
    root.render(
      <React.StrictMode>
        <ManageFaculty />
      </React.StrictMode>
    );
  };

  const handleparent = () => {
    root.render(
      <React.StrictMode>
        <ManageParent />
      </React.StrictMode>
    );
  };

  return (
    <div style={{ height: '100vh' }}>
      {imageLoaded ? (
        <Router>
          <div style={{ backgroundColor: 'lightblue', color: 'whitesmoke', textAlign: 'center' }}>
            <h1 style={{ color: 'black', fontFamily: 'cursive' }}>
              Admin Panel
            </h1>
            <div style={{ background: 'black', padding: '10px' }}>
              <Link to="/" className="link" style={{ textDecoration: 'none', margin: '0 35px', fontFamily: 'cursive' }}>Home</Link>
              <Link to="/managestudents" className="link" onClick={handlestudent} style={{ textDecoration: 'none', margin: '0 35px', fontFamily: 'cursive' }}>Manage Students</Link>
              <Link to="/managefaculties" className="link" onClick={handlefaculty} style={{ textDecoration: 'none', margin: '0 35px', fontFamily: 'cursive' }}>Manage Faculties</Link>
              <Link to="/manageparents" className="link" onClick={handleparent} style={{ textDecoration: 'none', margin: '0 35px', fontFamily: 'cursive' }}>Manage Parents</Link>
              <button className="btn btn-primary" onClick={handlesignout} style={{ padding: '4px 8px', fontSize: '12px', marginLeft: '20px' }}>
                Sign Out
              </button>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<ManageStudent />} />
              <Route path="/update" element={<ManageFaculty />} />
              <Route path="/delete" element={<ManageParent />} />
            </Routes>
          </div>
        </Router>
      ) : null}
      <div style={{ backgroundColor: 'lightgreen', height: '100%', width: '100%' }}>
        {imageLoaded ? (
          <img src={faculty} alt="Faculty" className="img-fluid"
          style={{ height: '100%', width: '100%' }} />
          ) : null}
          </div>
          <div style={{ marginTop: '-10px' }}>
          <Footer />
          </div>
          </div>
          );
          };
          
          export default AdminDashboard;








