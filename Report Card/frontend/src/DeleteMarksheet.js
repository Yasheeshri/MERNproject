import React, { useState } from 'react';
import axios from 'axios';

const DeleteMarksheet = () => {
  const [userId, setUserId] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDeleteButton = () => {
    axios
      .delete(`http://localhost:5000/results/${userId}`)
      .then((res) => {
        console.log(res.data);
        alert('Marksheet deleted successfully');
      })
      .catch((err) => {
        alert('Failed to delete marksheet');
      });
  };

  return (
    <div className="container mt-5" style={{"fontFamily":"cursive"}}>
      <h1 className="text-center" >Delete Marksheet</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              placeholder="Enter User ID"
              onChange={handleUserIdChange}
              value={userId}
            />
          </div>
          <button className="btn btn-danger btn-lm" onClick={handleDeleteButton}>
            Delete Marksheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMarksheet;
