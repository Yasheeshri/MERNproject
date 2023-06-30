import React, { useState } from "react";
import axios from "axios";

const AdminStudentDelete = () => {
  const [userId, setUserId] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDeleteButton = () => {
    axios
      .put(`http://localhost:5000/student/studentupdate/${userId}`, { studentstatus: "Inactive" })
      .then((res) => {
        console.log(res.data);
        alert("Student status updated successfully");
      })
      .catch((err) => {
        alert(err);
      });
  };


  return (
    <div className="container" style={{"marginTop":"80px"}}>
     <center> <h1 style={{"fontFamily":"cursive"}}>Delete Student</h1></center>
      <div className="form-group">
        <label htmlFor="userId">Student User ID:</label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="User ID"
          onChange={handleUserIdChange}
          value={userId}
        />
      </div>
      <button className="btn btn-danger" onClick={handleDeleteButton}>
        Delete
      </button>
    </div>
  );
};

export default AdminStudentDelete;
