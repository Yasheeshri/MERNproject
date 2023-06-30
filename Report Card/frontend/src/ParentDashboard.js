
import React, { useState, useEffect } from 'react';

import './Marquee.css';
import ParentLogin from './ParentLogin';
import ReactDOM from 'react-dom/client';


function ParentDashboard(props) {
  const photoName = props.data.childUserId;
  const [showImage, setShowImage] = useState(false);
  const [marksheetURL, setMarksheetUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const root = ReactDOM.createRoot(document.getElementById('root'));



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



  //

  const handleDownload = () => {
    if (marksheetURL) {
      const link = document.createElement('a');
      link.href = marksheetURL;
      link.download = `${props.data.childUserId}_Marksheet.png`;
      link.click();
    }
  };

  //







  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }







  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const handleSignOut = () => {
    alert(`Successfully Logged Out`);
    root.render(
      <React.StrictMode>

        <ParentLogin />
      </React.StrictMode>
    );


  }

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'lightgreen', height: '473px' }}>
      <h1 style={{ textShadow: '2px 2px 4px rgba(0.5, 0.5, 0, 0.8)', fontSize: '40px', "fontFamily": "cursive" }}>
        Welcome {props.data.parentName}
      </h1>
      <span style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button className="btn btn-danger btn-sm"
          onClick={handleSignOut} style={{ "padding": '4px 8px', fontSize: '12px' }}>Sign Out</button>
      </span>

      <div className="marquee-container">
        <div className="marquee-text" style={{ "fontFamily": "cursive" }}>
          The marksheet is just a snapshot of their academic journey. It's the lessons learned along the way that truly matter.
        </div>
      </div>

      <div style={{ display: 'flex', marginTop: '35px' }}>
        <div style={{ height: 'auto', width: '50%', backgroundColor: 'whitesmoke' }}>
          <h1 style={{ "fontFamily": "cursive" }}>Parent Details</h1>
          <table className="table table-bordered table-lm table-hover" style={{ "fontFamily": "cursive", "marginTop": "49px" }}>
            <tbody>
              <tr>
                <th>Parent Name</th>
                <td>{props.data.parentName}</td>
              </tr>
              <tr>
                <th>Mobile Number</th>
                <td>{props.data.mobileNumber}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>
                  {props.data.address.city}, {props.data.address.pincode}, {props.data.address.state}
                </td>
              </tr>
              <tr>
                <th>User ID</th>
                <td>{props.data.userId}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: '500px', width: '50%', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-success" onClick={toggleImage}>
              {showImage ? 'Hide Marksheet' : 'View Marksheet'}
            </button>
            <button id="download" onClick={handleDownload} className="btn btn-primary ">
              Download
            </button>
          </div>
          {showImage && (
            <img
              src={marksheetURL}
              alt={`${props.data.name}'s Marksheet Unavailable`}
              style={{ height: '410px', width: '100%' }}
            />
          )}
        </div>

      </div>

      {/* <button  id="download" onClick={handleDownload} className="btn btn-primary " style={{"position":"absolute","top":"115px","left":"710px"}}>Download</button> */}
    </div>
  );
}

export default ParentDashboard;
