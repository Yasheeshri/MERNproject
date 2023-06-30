
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminStudents from './AdminStudents';
import AdminStudentsSearch from './AdminStudentsSearch';
import AdminStudentUpdate from './AdminStudentUpdate';
import AdminStudentDelete from './AdminStudentDelete';

const ManageStudent = () => {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link className="navbar-brand" to="/" style={{"fontFamily":"cursive"}}>Manage Students</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/show-students">Show Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/update">Update</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/delete">Delete</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container mt-4">
                    <Routes>
                        <Route path="/show-students" element={<AdminStudents />} />
                        <Route path="/search" element={<AdminStudentsSearch />} />
                        <Route path="/update" element={<AdminStudentUpdate />} />
                        <Route path="/delete" element={<AdminStudentDelete />} />
                    </Routes>
                </div>

              
            </div>
        </Router>
    );
};

export default ManageStudent;












