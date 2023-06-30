import React, { useEffect, useState } from 'react';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);

  // Fetching data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/student/studentshow');
        const data = await response.json();
        setStudents(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="text-center">
            <h1 className="text-black" style={{"fontFamily":"cursive"}}>Students</h1>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">User Id</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;




