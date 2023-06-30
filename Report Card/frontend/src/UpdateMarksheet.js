
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import FinalReportcard from './FinalReportcard';
import './Marquee.css';

const UploadMarksheet = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showReportCard, setShowReportCard] = useState(false);

  useEffect(() => {
    // Fetch student data when the component mounts
    axios
      .get('http://localhost:5000/student/studentshow')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStudentClick = (userId) => {
    // Find the student with the clicked userId
    const selected = students.find((student) => student.userId === userId);
    if (selected) {
      setSelectedStudent(selected);
      setShowReportCard(false); // Reset showReportCard state when a new student is selected
    }
  };

  const handleGenerateMarksheet = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <FinalReportcard data={selectedStudent} />
      </React.StrictMode>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', "backgroundColor": "lightgrey", "height": "auto", "width": "100%" }}>
      <div>
        <div style={{ marginLeft: '90px' }}>
          <center>
            <h1 style={{ color: 'red', fontFamily: 'cursive', textShadow: '2px 2px 4px #000000' }}>
              Update Marksheet
            </h1>
          </center>
        </div>
        <div className="marquee-container marquee-text" style={{ fontFamily: 'cursive', marginLeft: '0px' }}>
          Click On The Student Name to View Student's Details
        </div>

        <div className="table-container" style={{ display: 'flex', fontFamily: 'cursive' }}>
          <div className="left-table" style={{ flex: 1, marginRight: '10px' }}>
            <h3 style={{ fontFamily: 'cursive' }}>Student List:</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-sm table-hover">
                <thead>
                  <tr>
                    <th style={{ "backgroundColor": "pink" }}>Name</th>
                  </tr>
                </thead>
                <tbody style={{ "backgroundColor": "lightgreen" }}>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td onClick={() => handleStudentClick(student.userId)} style={{ cursor: 'pointer' }}>
                        {student.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="right-table" style={{ flex: 1, marginLeft: '10px' }}>
            {selectedStudent && (
              <div>
                <h3 style={{ fontFamily: 'cursive' }}>Student Details:</h3>
                <table className="table table-bordered table-sm details-table table-striped table-hover">
                  <thead style={{ "backgroundColor": "pink" }}>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody style={{ "backgroundColor": "lightgreen" }}>
                    <tr>
                      <td>Name</td>
                      <td>{selectedStudent.name}</td>
                    </tr>
                    <tr>
                      <td>Enrollment Number</td>
                      <td>{selectedStudent.enrollmentNumber}</td>
                    </tr>
                    <tr>
                      <td>DOB</td>
                      <td>{new Date(selectedStudent.dob).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{selectedStudent.gender}</td>
                    </tr>
                    <tr>
                      <td>Course</td>
                      <td>{selectedStudent.course}</td>
                    </tr>
                    <tr>
                      <td>Branch</td>
                      <td>{selectedStudent.branch}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{selectedStudent.mobileNumber}</td>
                    </tr>
                    <tr>
                      <td>Year</td>
                      <td>{selectedStudent.year}</td>
                    </tr>
                    <tr>
                      <td>Father's Name</td>
                      <td>{selectedStudent.fatherName}</td>
                    </tr>
                    <tr>
                      <td>Mother's Name</td>
                      <td>{selectedStudent.motherName}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                        {selectedStudent.address.city}, {selectedStudent.address.pincode}, {selectedStudent.address.state}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ textAlign: 'center' }}>
                  <button className="btn btn-success" onClick={handleGenerateMarksheet}>
                    Generate Marksheet
                  </button>
                </div>
              </div>
            )}
            {showReportCard && selectedStudent && <FinalReportcard data={selectedStudent} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMarksheet;



















