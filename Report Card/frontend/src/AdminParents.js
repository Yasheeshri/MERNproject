import React, { useEffect, useState } from 'react';

const AdminParents = () => {
  const [parents, setParents] = useState([]);

  // Fetching data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/parent/parentshow');
        const data = await response.json();
        setParents(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching parent data:', error);
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
              Parents
            </h1>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Parent Name</th>
                  <th scope="col">User Id</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent._id}>
                    <td>{parent.parentName}</td>
                    <td>{parent.userId}</td>
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

export default AdminParents;
