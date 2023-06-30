import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminParents from './AdminParents';
import AdminParentSearch from './AdminParentSearch';
import AdminParentUpdate from './AdminParentUpdate';
import AdminParentDelete from './AdminParentDelete';

const ManageParent = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-black" >
          <Link className="navbar-brand" to="/" style={{ fontFamily: 'cursive' }}>
            Manage Parents
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
                <Link className="nav-link" to="/show-parents">
                  Show Parents
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
            <Route path="/show-parents" element={<AdminParents />} />
            <Route path="/search" element={<AdminParentSearch />} />
            <Route path="/update" element={<AdminParentUpdate />} />
            <Route path="/delete" element={<AdminParentDelete />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default ManageParent;
