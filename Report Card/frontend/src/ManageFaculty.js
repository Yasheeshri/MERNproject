import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminFaculties from './AdminFaculties';
import AdminFacultiesSearch from './AdminFacultiesSearch';
import AdminFacultyUpdate from './AdminFacultyUpdate';
import AdminFacultyDelete from './AdminFacultyDelete';

const ManageFaculty = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <Link className="navbar-brand" to="/" style={{ fontFamily: 'cursive' }}>
            Manage Faculties
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/show-faculties">
                  Show Faculties
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update">
                  Update
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/delete">
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/show-faculties" element={<AdminFaculties />} />
            <Route path="/search" element={<AdminFacultiesSearch />} />
            <Route path="/update" element={<AdminFacultyUpdate />} />
            <Route path="/delete" element={<AdminFacultyDelete />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default ManageFaculty;
