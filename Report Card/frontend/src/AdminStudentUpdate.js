

import React, { useState } from 'react';
import axios from 'axios';

function AdminStudentUpdate() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [parentsMobile, setParentsMobile] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [studentstatus, setstudentstatus] = useState("");
 



  const handlestudentstatus = (evt) => {
    setstudentstatus(evt.target.value);
  }





  const handleUserId = (evt) => {
    setUserId(evt.target.value);
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  }

  const handleName = (evt) => {
    setName(evt.target.value);
  }
  const handleEnrollmentNumber = (evt) => {
    setEnrollmentNumber(evt.target.value);
  }

  const handleMobileNumber = (evt) => {
    setMobileNumber(evt.target.value);
  }

  const handleDob = (evt) => {
    setDob(evt.target.value);
  }

  const handleParentsMobile = (evt) => {
    setParentsMobile(evt.target.value);
  }

  const handleMotherName = (evt) => {
    setMotherName(evt.target.value);
  }

  const handleFatherName = (evt) => {
    setFatherName(evt.target.value);
  }

  const handleGender = (evt) => {
    setGender(evt.target.value);
  }

  const handleCourse = (evt) => {
    setCourse(evt.target.value);
  }

  const handleBranch = (evt) => {
    setBranch(evt.target.value);
  }

  const handleYear = (evt) => {
    setYear(evt.target.value);
  }
  const handleSaveButton = () => {
    // Fetch existing student details
    axios.get(`http://localhost:5000/student/studentdetails/${userId}`)
      .then(res => {
        const existingStudent = res.data;

        // Update only the desired field with the new value, or keep the existing value if the field is blank
        const updatedStudent = {
          ...existingStudent,
          studentstatus: studentstatus !== "" ? studentstatus : existingStudent.name,
          name: name !== "" ? name : existingStudent.name,
          password: password !== "" ? password : existingStudent.password,
          enrollmentNumber: enrollmentNumber !== "" ? enrollmentNumber : existingStudent.enrollmentNumber,
          mobileNumber: mobileNumber !== "" ? mobileNumber : existingStudent.mobileNumber,
          dob: dob !== "" ? dob : existingStudent.dob,
          parentsMobile: parentsMobile !== "" ? parentsMobile : existingStudent.parentsMobile,
          motherName: motherName !== "" ? motherName : existingStudent.motherName,
          fatherName: fatherName !== "" ? fatherName : existingStudent.fatherName,
          gender: gender !== "" ? gender : existingStudent.gender,
          course: course !== "" ? course : existingStudent.course,
          branch: branch !== "" ? branch : existingStudent.branch,
          year: year !== "" ? year : existingStudent.year
        };

        // Make the update API call
        axios.put(`http://localhost:5000/student/studentupdate/${userId}`, updatedStudent)
          .then(res => {
            console.log(res.data);
            alert("Student Details Updated Successfully");
          })
          .catch(err => {
            alert(err);
          });
      })
      .catch(err => {
        alert(`UserId Not Found`);
      });
  }


  return (
    <div style={{ backgroundColor: "lightblue" }}>
      <h1 className="text-black text-center fw-bold fs-1 py-4" style={{ "fontFamily": "cursive" }}>Update Student Details</h1>
      <center>
        <table className="table table-sm">
          <tbody style={{ "fontFamily": "cursive" }}>

          <tr>
              <td>Student Status</td>
              <td>
                <input type="text" className="form-control" placeholder="Status" onChange={handlestudentstatus} value={studentstatus} />
              </td>
            </tr>

            <tr>
              <td>Student User ID</td>
              <td>
                <input type="text" className="form-control" placeholder="User ID" onChange={handleUserId} value={userId} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="password" className="form-control" placeholder="Password" onChange={handlePassword} value={password} />
              </td>
            </tr>
            <tr>
              <td>Student Name</td>
              <td>
                <input type="text" className="form-control" placeholder="Name" onChange={handleName} value={name} />
              </td>
            </tr>




            <tr>
            <td>Enrollment Number</td>
            <td>
              <input type="text" className="form-control" placeholder="Enrollment Number" onChange={handleEnrollmentNumber} value={enrollmentNumber} />
            </td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>
              <input type="text" className="form-control" placeholder="Mobile Number" onChange={handleMobileNumber} value={mobileNumber} />
            </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>
              <input type="Date" className="form-control" placeholder="Date of Birth" onChange={handleDob} value={dob} />
            </td>
          </tr>
          <tr>
            <td>Parent's Mobile Number</td>
            <td>
              <input type="text" className="form-control" placeholder="Parent's Mobile Number" onChange={handleParentsMobile} value={parentsMobile} />
            </td>
          </tr>
          <tr>
            <td>Mother's Name</td>
            <td>
              <input type="text" className="form-control" placeholder="Mother's Name" onChange={handleMotherName} value={motherName} />
            </td>
          </tr>
          <tr>
            <td>Father's Name</td>
            <td>
              <input type="text" className="form-control" placeholder="Father's Name" onChange={handleFatherName} value={fatherName} />
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
              <input type="text" className="form-control" placeholder="Gender" onChange={handleGender} value={gender} />
            </td>
          </tr>
          <tr>
            <td>Course</td>
            <td>
              <input type="text" className="form-control" placeholder="Course" onChange={handleCourse} value={course} />
            </td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>
              <input type="text" className="form-control" placeholder="Branch" onChange={handleBranch} value={branch} />
            </td>
          </tr>
          <tr>
            <td>Year</td>
            <td>
              <input type="text" className="form-control" placeholder="Year" onChange={handleYear} value={year} />
            </td>
          </tr>











            <tr>
              <td colSpan="2" className="text-center">
                <button type="submit" className="btn btn-primary" onClick={handleSaveButton}>Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default AdminStudentUpdate;
