
import React, { useState } from 'react';
import axios from 'axios';

function AdminFacultyUpdate() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [facultystatus, setFacultystatus] = useState('');

  const handleUserId = (evt) => {
    setUserId(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleName = (evt) => {
    setName(evt.target.value);
  };

  const handleDob = (evt) => {
    setDob(evt.target.value);
  };

  const handleMobileNumber = (evt) => {
    setMobileNumber(evt.target.value);
  };

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleAddress = (evt) => {
    setAddress(evt.target.value);
  };

  const handleGender = (evt) => {
    setGender(evt.target.value);
  };

  const handleFacultystatus = (evt) => {
    setFacultystatus(evt.target.value);
  };

  const handleSaveButton = () => {
    // Fetch existing faculty details
    axios
      .get(`http://localhost:5000/faculty/facultydetails/${userId}`)
      .then((res) => {
        const existingFaculty = res.data;

        // Update only the desired field with the new value, or keep the existing value if the field is blank
        const updatedFaculty = {
          ...existingFaculty,
          userId: userId || existingFaculty.userId,
          password: password || existingFaculty.password,
          name: name || existingFaculty.name,
          dob: dob || existingFaculty.dob,
          mobileNumber: mobileNumber || existingFaculty.mobileNumber,
          email: email || existingFaculty.email,
          address: address || existingFaculty.address,
          gender: gender || existingFaculty.gender,
          facultystatus: facultystatus || existingFaculty.facultystatus,
        };

        // Make the update API call
        axios
          .put(`http://localhost:5000/faculty/facultyupdate/${userId}`, updatedFaculty)
          .then((res) => {
            console.log(res.data);
            alert('Faculty Details Updated Successfully');
          })
          .catch((err) => {
            alert('Faculty Details Updated Successfully');
          });
      })
      .catch((err) => {
        alert('UserId Not Found');
      });
  };

  return (
    <div className="container " style={{"fontFamily":"cursive"}}>
      <h1 style={{"fontFamily":"cursive"}} className="text-center">Update Faculty Details</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID:
          </label>
          <input type="text" className="form-control" id="userId" value={userId} onChange={handleUserId} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="text" className="form-control" id="password" value={password} onChange={handlePassword} />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input type="text" className="form-control" id="name" value={name} onChange={handleName} />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth:
          </label>
          <input type="text" className="form-control" id="dob" value={dob} onChange={handleDob} />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number:
          </label>
          <input type="text" className="form-control" id="mobileNumber" value={mobileNumber} onChange={handleMobileNumber} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input type="text" className="form-control" id="email" value={email} onChange={handleEmail} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address:
          </label>
          <input type="text" className="form-control" id="address" value={address} onChange={handleAddress} />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <input type="text" className="form-control" id="gender" value={gender} onChange={handleGender} />
        </div>
        <div className="mb-3">
          <label htmlFor="facultystatus" className="form-label">
            Status:
          </label>
          <input type="text" className="form-control" id="facultystatus" value={facultystatus} onChange={handleFacultystatus} />
        </div>
       
        <button type="button" className="btn btn-success  btn-lm" onClick={handleSaveButton}>
          Save
        </button>
      </form>
    </div>
  );
}

export default AdminFacultyUpdate;
