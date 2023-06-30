import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import './ImageSlider.css';
import StudentRoute from './StudentRoute';
import FacultyRoute from './FacultyRoute';
import ParentRoute from './ParentRoute';
import ImageSlider from './ImageSlider';
import AboutRoute from './AboutRoute';
import Footer from './Footer';

const Home = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/' || location.pathname === '/title';

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ height: '60px', position: 'absolute', top: '0', left: '0', right: '0', padding: '20px', background: 'lightgreen', zIndex: '999' }}>
        <div id="logo" style={{ marginTop: '-20px' }}>
          <img src="/images/logo.png" alt="logo" style={{ width: '150px', height: '60px' }} />
        </div>
        <h1 style={{ marginRight: '100px', marginBottom: '5px', marginTop: '-25px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontSize: '45px' }}>
          <Link to="/title" style={{ textDecoration: 'none', color: 'black' }}>
            🆁🅴🅿🅾🆁🆃 🅲🅰🆁🅳
          </Link>
        </h1>
        <div id="notebook" style={{ height: '50px', width: '50px' }}>
          <img src="/images/notebook.png" alt="notebook" style={{ width: '50px', height: '50px', marginLeft: '-35px', marginTop: '-12px' }} />
        </div>
      </div>

      <div className="d-flex justify-content-between" style={{ position: 'absolute', top: '60px', left: '0', right: '0', padding: '20px', background: '#f0f0f0', zIndex: '999', backgroundColor: 'black', height: '10px', width: '100%', paddingBottom: '30px', paddingTop: '4px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'lightgreen' }}>
          Home
        </Link>
        <Link to="/admin" style={{ textDecoration: 'none', color: 'lightgreen' }}>
          Admin
        </Link>
        <Link to="/student" style={{ textDecoration: 'none', color: 'lightgreen' }}>
          Student
        </Link>
        <Link to="/faculty" style={{ textDecoration: 'none', color: 'lightgreen' }}>
          Faculty
        </Link>
        <Link to="/parent" style={{ textDecoration: 'none', color: 'lightgreen' }}>
          Parent
        </Link>
        <Link to="/about" style={{ textDecoration: 'none', color: 'lightgreen' }}>
          About
        </Link>
      </div>

      <div>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/student" element={<StudentRoute />} />
          <Route path="/faculty" element={<FacultyRoute />} />
          <Route path="/parent" element={<ParentRoute />} />
          <Route path="/about" element={<AboutRoute />} />
        </Routes>
      </div>

      {isHomeRoute && <ImageSlider />}
     
        <Footer/>
   
    </div>
  );
};

export default Home;





















