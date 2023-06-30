import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import StudentLogin from './StudentLogin.js';

function StudentDashboard(props) {
  const photoName = props.data.userId;
  const reportcard = props.data.userId;
  const extension = props.data.photoFilePath.substring(props.data.photoFilePath.lastIndexOf('.'));
  const [showImage, setShowImage] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [marksheetURL, setMarksheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dateStr = props.data.dob;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString();
  const root = ReactDOM.createRoot(document.getElementById('root'));

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const handleSignOut = () => {
    alert('Successfully Logged Out');
    root.render(
      <React.StrictMode>
        <StudentLogin />
      </React.StrictMode>
    );
  };

  useEffect(() => {
    // Fetch the photo from the backend
    fetch(`http://localhost:5000/studentphotos/${photoName}${extension}`)
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
  }, [photoName, extension]);

  useEffect(() => {
    // Fetch the photo from the backend
    fetch(`http://localhost:5000/results/${photoName}.png`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.blob();
      })
      .then((blob) => {
        // Convert the blob to a URL
        const marksheetURL = URL.createObjectURL(blob);
        setMarksheetUrl(marksheetURL);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching photo:', error);
      });

    // Clean up the URL object when component unmounts
    return () => {
      if (marksheetURL) {
        URL.revokeObjectURL(marksheetURL);
      }
    };
  }, [photoName]);

  const handleDownload = () => {
    if (marksheetURL) {
      const link = document.createElement('a');
      link.href = marksheetURL;
      link.download = `${props.data.name}_Marksheet.png`;
      link.click();
    }
  };


return (
  <div style={{ textAlign: 'center', backgroundColor: 'pink', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <div
      style={{
        width: '130px',
        height: '130px',
        margin: '7px auto',
        backgroundColor: 'white',
        backgroundImage: `url("${photoUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%',
        border: '4px solid #ccc',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
      }}
    ></div>
    <h2 style={{ textShadow: '2px 2px 4px rgba(0.5, 0.5, 0, 0.8)', fontSize: '40px', fontFamily: 'cursive' }}>
      Welcome {props.data.name}
    </h2>
    <span style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button
        className="btn btn-danger btn-sm"
        onClick={handleSignOut}
        style={{ padding: '4px 8px', fontSize: '12px' }}
      >
        Sign Out
      </button>
    </span>
    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', marginTop: '35px' }}>
      <div style={{ width: '50%', backgroundColor: 'white' }}>
        <h5 style={{ fontFamily: 'cursive', marginTop: '91px' }}>Student Details</h5>
        <table className="table table-bordered table-hover table-sm table-responsive" style={{ fontFamily: 'cursive' }}>
          <tbody>
          <tr className="table-primary">
                <th>Name</th>
                <td>{props.data.name}</td>
              </tr>
              <tr className="table-secondary">
                <th>Enrollment Number</th>
                <td>{props.data.enrollmentNumber}</td>
              </tr>
              <tr className="table-success">
                <th>Mobile Number</th>
                <td>{props.data.mobileNumber}</td>
              </tr>
              <tr className="table-danger">
                <th>Date of Birth</th>
                <td>{formattedDate}</td>
              </tr>
              <tr className="table-info">
                <th>Parent's Mobile</th>
                <td>{props.data.parentsMobile}</td>
              </tr>
              <tr className="table-warning">
                <th>Father's Name</th>
                <td>{props.data.fatherName}</td>
              </tr>
              <tr className="table-primary">
                <th>Mother's Name</th>
                <td>{props.data.motherName}</td>
              </tr>
              <tr className="table-secondary">
                <th>Gender</th>
                <td>{props.data.gender}</td>
              </tr>
              <tr className="table-success">
                <th>Address</th>
                <td>
                  {props.data.address.city}, {props.data.address.pincode}, {props.data.address.state}
                </td>
              </tr>
              <tr className="table-danger">
                <th>Course</th>
                <td>{props.data.course}</td>
              </tr>
              <tr className="table-info">
                <th>Year</th>
                <td>{props.data.year}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div style={{ width: '50%', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-success" onClick={toggleImage}>
            {showImage ? 'Hide Marksheet' : 'View Marksheet'}
          </button>
          <button id="download" onClick={handleDownload} className="btn btn-primary btn-sm">
            Download
          </button>
        </div>
        {showImage && (
          <img
            src={marksheetURL}
            alt={`${props.data.name}'s Marksheet Unavailable`}
            style={{ flex: '1', width: '100%', objectFit: 'contain' }}
          />
        )}
      </div>
    </div>
  </div>
);

}

export default StudentDashboard;






