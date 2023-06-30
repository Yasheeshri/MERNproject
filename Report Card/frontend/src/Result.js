

import React, { useState, useEffect, useRef } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import './resulttable.css';


import html2canvas from 'html2canvas';


const Result = ({ marksMap, totalMarks, totalOutOfMarks, totalObtainedMarks, totalOutOf, percentage, grade, result, userId, photoFilePath, extension, name, enrollmentNumber, mobileNumber, dob, fatherName, gender, course, branch, year }) => {
  const photoName = userId;
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function dataURLToBlob(dataURL) {
    if (!dataURL || typeof dataURL !== 'string') {
      throw new Error('Invalid data URL');
    }

    const parts = dataURL.split(',');
    if (parts.length !== 2) {
      throw new Error('Invalid data URL format');
    }

    const contentType = parts[0].match(/:(.*?);/)[1];
    const base64Data = parts[1];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }




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

  const ref = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const captureScreenshot = async () => {
    try {
      const screenshotDataUrl = await takeScreenshot(ref.current);
      console.log('Screenshot Data URL:', screenshotDataUrl); // Log the data URL for debugging

      const blob = dataURLToBlob(screenshotDataUrl);
      const fileName = `${userId}.png`; // Set the filename as userId.png or any desired format

      const screenshot = new File([blob], fileName, { type: "image/png" });

      // Create a FormData object and append the screenshot with the desired filename
      const formData = new FormData();
      formData.append('screenshot', screenshot, fileName);
      formData.append('userId', userId); // Add the userId to the request body
      // Send the screenshot to the backend
      fetch('http://localhost:5000/results', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          console.log('Screenshot sent to the backend successfully!');
        })
        .catch((error) => {
          console.error('Error sending the screenshot to the backend:', error);
        });
    } catch (error) {
      console.error('Error capturing the screenshot:', error);
    }
  };

  //





  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <div className="result-container">
      <div id="screenshot" ref={ref} className="screenshot-container">
        <div className="profile-container">
          <div
            className="profile-image"
            style={{
              backgroundImage: `url("${photoUrl}")`,
            }}
          ></div>
          <div className="profile-details">
            <div>
              <span className="label">Name:</span>
              <span className="value">{name}</span>
            </div>
            <div>
              <span className="label">Enrollment No.:</span>
              <span className="value">{enrollmentNumber}</span>
            </div>
            <div>
              <span className="label">Course:</span>
              <span className="value">{course}</span>
            </div>
            <div>
              <span className="label">Branch:</span>
              <span className="value">{branch}</span>
            </div>
            <div>
              <span className="label">Year:</span>
              <span className="value">{year}</span>
            </div>
            <div>
              <span className="label">Gender:</span>
              <span className="value">{gender}</span>
            </div>
            <div>
              <span className="label">DOB:</span>
              <span className="value">{dob}</span>
            </div>
            <div>
              <span className="label">Father:</span>
              <span className="value">{fatherName}</span>
            </div>
          </div>
        </div>
  
        <div className="marks-table-container">
          <table className="marks-table table-sm">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Out Of</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(marksMap).map(([subject, { marksObtained, outOf }]) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>{marksObtained}</td>
                  <td>{outOf}</td>
                </tr>
              ))}
              <tr className="last-row">
                <td className="total-label">Total</td>
                <td>{totalMarks}</td>
                <td>{totalOutOfMarks}</td>
              </tr>
              <tr className="result-label">
              <td >{result}</td>
              <td>{percentage}%</td> 
              <td>Grade: {grade}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div className="result-details">
         
        </div>
      </div>
  
      <div className="upload-button-container">
        <button className="screenshot btn btn-success btn-sm" onClick={captureScreenshot}>
          Upload
        </button>
      </div>
    </div>
  );
  
  



};

export default Result;



















































