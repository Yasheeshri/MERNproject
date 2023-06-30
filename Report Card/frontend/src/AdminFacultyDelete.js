import React, { useState } from "react";
import axios from "axios";

const AdminFacultyDelete = () => {
  const [userId, setUserId] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDeleteButton = () => {
    axios
      .put(`http://localhost:5000/faculty/facultyupdate/${userId}`, { facultystatus: "Inactive" })
      .then((res) => {
        console.log(res.data);
        alert("Faculty status updated successfully");
      })
      .catch((err) => {
        alert("Faculty status updated successfully");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={{ fontFamily: "cursive" }}>
        Delete Faculty
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="userId">Faculty User ID:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              placeholder="User ID"
              onChange={handleUserIdChange}
              value={userId}
            />
          </div>
          <button className="btn btn-danger btn-lm" 
             onClick={handleDeleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminFacultyDelete;
