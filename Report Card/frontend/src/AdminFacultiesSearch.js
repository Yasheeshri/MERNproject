

import React, { useEffect, useState } from 'react';

const FacultyDetails = ({ faculty }) => {


    const dateStr = faculty.dob;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString();
  return (
    <div>
      <h2 style={{ fontFamily: 'cursive' }}>Faculty Details</h2>
      <table className="table table-bordered table-sm table-hover 
      table-striped table-responsive table-secondary col-sm-12">
        <tbody>


        <tr>
            <td>Faculty Status</td>
            <td>{faculty.facultystatus}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td>{faculty.userId}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{faculty.name}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>{faculty.password}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{formattedDate}</td>
          </tr>
          <tr>
            <td>Mobile No.</td>
            <td>{faculty.mobileNumber}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{faculty.email}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {faculty.address.city}, {faculty.address.state},
               {faculty.address.pincode}
            </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{faculty.gender}</td>
          </tr>
          <tr>
            <td>Faculty Document File Path</td>
            <td>{faculty.facultyDocumentFilePath}</td>
          </tr>
          <tr>
            <td>Faculty Photo File Path</td>
            <td>{faculty.facultyPhotoFilePath}</td>
          </tr>
         
        </tbody>
      </table>
    </div>
  );
};

const AdminFacultiesSearch = () => {
  const [faculties, setFaculties] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // Fetching data from the database
  const fetchData = async (search) => {
    try {
      const response = await fetch(`http://localhost:5000/faculty/facultysearch/${search}`);
      const data = await response.json();
      setFaculties(data);
    } catch (error) {
      console.log('Error fetching faculty data:', error);
    }
  };

  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFacultyClick = (faculty) => {
    setSelectedFaculty(faculty);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12">
          <div className="text-center">
            <h1 className="text-black" style={{ fontFamily: 'cursive' }}>
              Search Faculties
            </h1>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by User ID"
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover table-responsive">
              <thead>
                <tr>
                  <th scope="col">Faculty Name</th>
                  <th scope="col">User ID</th>
                </tr>
              </thead>
              <tbody>
                {faculties.map((faculty) => (
                  <tr key={faculty._id} onClick={() => handleFacultyClick(faculty)}>
                    <td>{faculty.name}</td>
                    <td>{faculty.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedFaculty && <FacultyDetails faculty={selectedFaculty} />}
      </div>
    </div>
  );
};

export default AdminFacultiesSearch;
