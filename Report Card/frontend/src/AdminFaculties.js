import React, { useEffect, useState } from 'react';

const AdminFaculties = () => {
  const [faculties, setFaculties] = useState([]);

  // Fetching data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/faculty/facultyshow');
        const data = await response.json();
        setFaculties(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching faculty data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="text-center">
            <h1 className="text-black" style={{ fontFamily: 'cursive' }}>
              Faculties
            </h1>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">User Id</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty._id}>
                    <td>{faculty.name}</td>
                    <td>{faculty.userId}</td>
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

export default AdminFaculties;
