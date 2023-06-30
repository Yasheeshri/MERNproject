import React, { useState } from 'react';
import axios from 'axios';

function AdminParentUpdate() {
  const [userId, setUserId] = useState('');
  const [parentName, setParentName] = useState('');
  const [password, setPassword] = useState('tabrej');
  const [mobileNumber, setMobileNumber] = useState('');
  const [childUserId, setChildUserId] = useState('');
  const [address, setAddress] = useState({});
  const [parentstatus, setParentstatus] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [updatedOn, setUpdatedOn] = useState('');

  const handleUserId = (evt) => {
    setUserId(evt.target.value);
  };

  const handleParentName = (evt) => {
    setParentName(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleMobileNumber = (evt) => {
    setMobileNumber(evt.target.value);
  };

  const handleChildUserId = (evt) => {
    setChildUserId(evt.target.value);
  };

  const handleCity = (evt) => {
    setAddress({ ...address, city: evt.target.value });
  };

  const handleState = (evt) => {
    setAddress({ ...address, state: evt.target.value });
  };

  const handlePincode = (evt) => {
    setAddress({ ...address, pincode: evt.target.value });
  };

  const handleParentstatus = (evt) => {
    setParentstatus(evt.target.value);
  };

  const handleSaveButton = () => {
    // Fetch existing parent details
    axios
      .get(`http://localhost:5000/parent/parentdetails/${userId}`)
      .then((res) => {
        const existingParent = res.data;

        // Update only the desired fields with the new values, or keep the existing values if the fields are blank
        const updatedParent = {
          ...existingParent,
          userId: userId || existingParent.userId,
          parentName: parentName || existingParent.parentName,
          password: password || existingParent.password,
          mobileNumber: mobileNumber || existingParent.mobileNumber,
          childUserId: childUserId || existingParent.childUserId,
          address: {
            city: address.city || existingParent.address.city,
            state: address.state || existingParent.address.state,
            pincode: address.pincode || existingParent.address.pincode,
          },
          parentstatus: parentstatus || existingParent.parentstatus,
          createdOn: createdOn || existingParent.createdOn,
          updatedOn: updatedOn || existingParent.updatedOn,
        };

        // Make the update API call
        axios
          .put(`http://localhost:5000/parent/parentupdate/${userId}`, updatedParent)
          .then((res) => {
            console.log(res.data);
            alert('Parent Details Updated Successfully');
          })
          .catch((err) => {
            alert('Parent Details Update Failed');
          });
      })
      .catch((err) => {
        alert('UserId Not Found');
      });
  };

  return (
    <div className="container" style={{ fontFamily: 'cursive' }}>
      <h1 className="text-center">Update Parent Details</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID:
          </label>
          <input type="text" className="form-control" id="userId" value={userId} onChange={handleUserId} />
        </div>
        <div className="mb-3">
          <label htmlFor="parentName" className="form-label">
            Parent Name:
          </label>
          <input type="text" className="form-control" id="parentName" value={parentName} onChange={handleParentName} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="text" className="form-control" id="password" value={password} onChange={handlePassword} />
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            value={mobileNumber}
            onChange={handleMobileNumber}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="childUserId" className="form-label">
            Child User ID:
          </label>
          <input type="text" className="form-control" id="childUserId" value={childUserId} onChange={handleChildUserId} />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <input type="text" className="form-control" id="city" value={address.city} onChange={handleCity} />
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State:
          </label>
          <input type="text" className="form-control" id="state" value={address.state} onChange={handleState} />
        </div>
        <div className="mb-3">
          <label htmlFor="pincode" className="form-label">
            Pincode:
          </label>
          <input type="text" className="form-control" id="pincode" value={address.pincode} onChange={handlePincode} />
        </div>
        <div className="mb-3">
          <label htmlFor="parentstatus" className="form-label">
            Status:
          </label>
          <input
            type="text"
            className="form-control"
            id="parentstatus"
            value={parentstatus}
            onChange={handleParentstatus}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="createdOn" className="form-label">
            Created On:
          </label>
          <input type="text" className="form-control" id="createdOn" value={createdOn} onChange={(e) => setCreatedOn(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="updatedOn" className="form-label">
            Updated On:
          </label>
          <input type="text" className="form-control" id="updatedOn" value={updatedOn} onChange={(e) => setUpdatedOn(e.target.value)} />
        </div>
        <button type="button" className="btn btn-success btn-lm" onClick={handleSaveButton}>
          Save
        </button>
      </form>
    </div>
  );
}

export default AdminParentUpdate;
