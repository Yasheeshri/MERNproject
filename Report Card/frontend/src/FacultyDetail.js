
import React, { useState, useEffect } from 'react';
import FacultyLogin from './FacultyLogin.js';
import ReactDOM from 'react-dom/client';
import Home from './Home.js';
import './facultytable.css';

const FacultyDetail = (props) => {
  const { facultyDetails } = props;
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const root=ReactDOM.createRoot(document.getElementById('root'));
  useEffect(() => {
    if (!facultyDetails) {
      return;
    }

    const { userId, facultyPhotoFilePath } = facultyDetails;
    const photoName = userId;
    const extension = facultyPhotoFilePath.substring(facultyPhotoFilePath.lastIndexOf('.'));

    // Fetch the photo from the backend
    fetch(`http://localhost:5000/facultyphotos/${photoName}${extension}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.blob();
      })
      .then((blob) => {
        // Convert the blob to a URL
        const photoUrl = URL.createObjectURL(blob);
        setPhotoUrl(photoUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching photo:', error);
      });

    // Clean up the URL object when component unmounts
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [facultyDetails]);
 

  if (!facultyDetails) {
    return null;
  }

  const {
    userId,
    name,
    dob,
    mobileNumber,
    email,
    address: { city, state, pincode },
    gender,
  } = facultyDetails;

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  const handleButton = () => {
    root.render(
              <React.StrictMode>
                  <Home/>
              </React.StrictMode>
          );
  };

  return (
    <div className="container">
      <h1 className="heading">Faculty Details</h1>

      <div className="table-container">
        <div className="circle-div" style={{ backgroundImage: `url("${photoUrl}")` }}></div>

        <button className="btn btn-success" onClick={handleButton}>
          Faculty Home
        </button>

        <div className="table-wrapper">
          <table className="table table-striped table-bordered table-hover">
            <tbody>
              <tr>
                <th>User ID</th>
                <td>{userId}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{name}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{new Date(dob).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Mobile Number</th>
                <td>{mobileNumber}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{email}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{city}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{state}</td>
              </tr>
              <tr>
                <th>Pincode</th>
                <td>{pincode}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetail;







