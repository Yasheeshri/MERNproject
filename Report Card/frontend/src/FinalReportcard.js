
import React, { useState, useEffect } from 'react';
import Result from './Result.js';
import ReactDOM from 'react-dom/client';
const FinalReportcard = (props) => {
  // const subjectsData = JSON.parse(props.data.subjects);
  const subjectsData = (props.data.subjects);
  const userId = props.data.userId;
  const name = props.data.name;
  const enrollmentNumber = props.data.enrollmentNumber;
  const mobileNumber = props.data.mobileNumber;
  // const dob=props.data.dob;
  const dateStr = props.data.dob;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString();
  const fatherName = props.data.fatherName;
  const gender = props.data.gender;
  const course = props.data.course;
  const branch = props.data.branch;
  const year = props.data.year;
  const photopath = props.data.photoFilePath;
  const extension = props.data.photoFilePath.substring(props.data.photoFilePath.lastIndexOf('.'));
  const [showMarksEntry, setShowMarksEntry] = useState(false);
  const [marksData, setMarksData] = useState([]);
  const [totalObtainedMarks, settotalObtainedMarks] = useState(0);
  const [totaloutOf, settotaloutOf] = useState(0);

  const [marksMap, setMarksMap] = useState({});
  const totalmarks = marksData.reduce((total, marks) => total + marks.marksObtained, 0);
  const totalOutOfMarks = marksData.reduce((total, marks) => total + marks.additionalField, 0);


  const handleSubjectChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMarksData = [...marksData];
    const parsedValue = parseFloat(value); // Convert the value to a floating-point number

    if (!isNaN(parsedValue)) {
      updatedMarksData[index] = {
        ...updatedMarksData[index],
        [name]: parsedValue, // Update the value as a number
      };
      setMarksData(updatedMarksData);
    }
  };




  const handleSubmit = (event) => {
    event.preventDefault();



    const marksMap = {};
    marksData.forEach((marks, index) => {
      const subject = subjectsData[index];
      const marksObtained = marks.marksObtained;
      const outOf = marks.additionalField;
      marksMap[subject] = { marksObtained, outOf };
    });

    setShowMarksEntry(false);

    // Pass the marksMap object as a prop to the Result component
    setMarksMap(marksMap);


    const percentage = Math.round((totalmarks / totalOutOfMarks) * 100);

    let grade = '';
    if (percentage >= 90) {
      grade = 'A';
    } else if (percentage >= 80) {
      grade = 'B';
    } else if (percentage >= 70) {
      grade = 'C';
    } else if (percentage >= 60) {
      grade = 'D';
    } else {
      grade = 'F';
    }


    let result = "";
    if (grade === 'A' || grade === 'B' || grade === 'C' || grade === 'D') {
      result = "PASS";
    }
    else {
      result = "FAIL";
    }







    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Result
          userId={userId}
          subjects={subjectsData}
          marksData={marksData}
          marksMap={marksMap}
          totalObtainedMarks={totalObtainedMarks}
          totalOutOf={totaloutOf}
          totalMarks={totalmarks}
          totalOutOfMarks={totalOutOfMarks}
          percentage={percentage}
          grade={grade}
          result={result}
          photopath={photopath}
          extension={extension}
          name={name}
          enrollmentNumber={enrollmentNumber}
          mobileNumber={mobileNumber}
          dob={formattedDate}
          fatherName={fatherName}
          gender={gender}
          course={course}
          branch={branch}
          year={year}

        />
      </React.StrictMode>
    );


  };


  const handleProceed = () => {


    setShowMarksEntry(true);
  };

  return (
    <div className="container" style={{ "fontFamily": "cursive" }}>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Student Details</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="studentName">Student Name:</label>
                  <input type="text" className="form-control" id="studentName" name="studentName" value={props.data.name} readOnly disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="enrollmentNo">Enrollment No:</label>
                  <input type="text" className="form-control" id="enrollmentNo" name="enrollmentNo" value={props.data.enrollmentNumber} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="course">Course:</label>
                  <input type="text" className="form-control" id="course" name="course" value={props.data.course} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="branch">Branch:</label>
                  <input type="text" className="form-control" id="branch" name="branch" value={props.data.branch} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year:</label>
                  <input type="text" className="form-control" id="year" name="year" value={props.data.year} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="fatherName">Father Name:</label>
                  <input type="text" className="form-control" id="fatherName" name="fatherName" value={props.data.fatherName} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="motherName">Mother Name:</label>
                  <input type="text" className="form-control" id="motherName" name="motherName" value={props.data.motherName} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" className="form-control" id="phone" name="phone" value={props.data.mobileNumber} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="subjects">Subjects (You Have {props.data.subjects.length} Subjects):</label>
                  <select className="form-control" id="subjects" name="subjects" multiple disabled>
                    {subjectsData.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleProceed}>
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>

        {showMarksEntry && (
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Marks Entry</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Subjects</th>
                          <th>Marks Obtained</th>
                          <th>Out Of</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectsData.map((subject, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="subjectName"
                                value={subject}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="marksObtained"
                                placeholder="Score"
                                required
                                onChange={(event) => handleSubjectChange(index, event)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="additionalField"
                                placeholder="Out Of"
                                required
                                onChange={(event) => handleSubjectChange(index, event)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="totalObtainedMarks">Total Obtained Marks:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="totalObtainedMarks"
                          name="totalObtainedMarks"
                          value={totalmarks}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="totalOutOf">Total Out Of Marks:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="totalOutOf"
                          name="totalOutOf"
                          value={totalOutOfMarks}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Marks
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );


};
export default FinalReportcard;




























