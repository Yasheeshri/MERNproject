
//final

const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./DB');
const studentRoute = require('./student.route.js');
const facultyRoute = require('./faculty.route.js');
const parentRoute = require('./parent.route.js');
const adminRoute = require('./admin.route.js');
const Student = require('./student.model');
const faculty = require('./faculty.model');
const Admin = require('./admin.model');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(config.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'documentFile') {
      cb(null, './studentdocs');
    } else if (file.fieldname === 'photoFile') {
      cb(null, './studentphotos');
    } else if (file.fieldname === 'facultyDocumentFile') {
      cb(null, './facultydocs');
    } else if (file.fieldname === 'facultyPhotoFile') {
      cb(null, './facultyphotos');
    } else {
      cb(new Error('Invalid fieldname'));
    }
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    //this code makes the userId to be the name of files when uploaded.
     //***/
      const userId = req.body.userId; // Get the userId from the request body
      const fileExtension = path.extname(file.originalname); // Get the original file extension
      const fileName = `${userId}${fileExtension}`; // Combine userId and file extension
      cb(null, fileName); // Use the combined filename
     //***/
   
  },
});

const upload = multer({ storage });




//*
app.get('/', (req, res) => {
  res.send('Welcome to the server!'); // Replace with your desired response
});




// Route to serve student photos
app.get('/studentphotos/:filename', (req, res) => {
  const filename = req.params.filename;
  const photoPath = path.join(__dirname, 'studentphotos', filename);
  res.sendFile(photoPath);
});


//Route to serve marksheet

app.get('/results/:filename', (req, res) => {
  const filename = req.params.filename;
  const marksheetPath = path.join(__dirname, 'results', filename);
  res.sendFile(marksheetPath);
});







// Route to serve faculty photos
app.get('/facultyphotos/:filename', (req, res) => {
  const filename = req.params.filename;
  const photoPath = path.join(__dirname, 'facultyphotos', filename);
  res.sendFile(photoPath);
});

//*

//** */
//student registration
app.post('/student/studentregister', upload.fields([{ name: 'documentFile', maxCount: 1 }, { name: 'photoFile', maxCount: 1 }]), (req, res) => {
  // Process form data and files
  const formData = req.body;
 
  const documentFile = req.files['documentFile'][0];
  const photoFile = req.files['photoFile'][0];
  
  // Check if a student with the same userId already exists
  Student.findOne({ userId: formData.userId })
    .then(existingStudent => {
      if (existingStudent) {
        // If a student with the same userId exists, send an alert
        res.status(200).json({ message: 'Student already registered' });
      } else {

        //** */
const name = formData.name.substring(0, 40); // Limit name to 40 characters

if (name.length > 40) {
  res.status(400).json({ error: 'Name should not exceed 40 characters' });
  return;
}

//** */
        // Create a new student instance using the form data
        const newStudent = new Student({
          userId: formData.userId,
          password: formData.password,
          name: formData.name,
          enrollmentNumber: formData.enrollmentNumber,
          mobileNumber: formData.mobileNumber,
          dob: formData.dob,
          parentsMobile: formData.parentsMobile,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          gender: formData.gender,
          address: {
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          course: formData.course,
          branch: formData.branch, 
          subjects: formData.subjects.split(','), // Split and store multiple subjects as an array
          year: formData.year,
          documentFilePath: documentFile.path,
          photoFilePath: photoFile.path,

          // documentFilePath: `./studentdocs/${formData.userId}-${documentFile.originalname}`,
          //           photoFilePath: `./studentphotos/${formData.userId}-${photoFile.originalname}`,  
        });

        // Save the new student to the database
        newStudent
          .save()
          .then(() => {
            res.status(200).json({ message: 'Student registration successful' });
          })
          .catch((error) => {
            res.status(500).json({ error: 'An error occurred during student registration' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred during student registration' });
    });
});













app.post('/faculty/facultyregister', upload.fields([{ name: 'facultyDocumentFile', maxCount: 1 }, { name: 'facultyPhotoFile', maxCount: 1 }]), (req, res) => {
  // Process form data and files
  const formData = req.body;
  const facultyDocumentFile = req.files['facultyDocumentFile'][0];
  const facultyPhotoFile = req.files['facultyPhotoFile'][0];

  // Check if a faculty with the same userId already exists
  faculty.findOne({ userId: formData.userId })
    .then(existingFaculty => {
      if (existingFaculty) {
        // If a faculty with the same userId exists, send an alert
        res.status(200).json({ message: 'Faculty already registered' });
      } else {


//** */
const name = formData.name.substring(0, 40); // Limit name to 40 characters

if (name.length > 40) {
  res.status(400).json({ error: 'Name should not exceed 40 characters' });
  return;
}

//** */




        // Create a new faculty instance using the form data
        const newFaculty = new faculty({
          userId: formData.userId,
          password: formData.password,
          name: formData.name,
          dob: formData.dob,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          address: {
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          },
          gender: formData.gender,
          facultyDocumentFilePath: facultyDocumentFile.path,
          facultyPhotoFilePath: facultyPhotoFile.path,
        });

        // Save the new faculty to the database
        newFaculty
          .save()
          .then(() => {
            res.status(200).json({ message: 'Faculty registration successful' });
          })
          .catch((error) => {
            res.status(500).json({ error: 'An error occurred during faculty registration' });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred during faculty registration' });
    });
});



// // Serve the static files
app.use(express.static(path.join(__dirname, 'frontend')));



const screenshotUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'results/');
  },
  filename: function (req, file, cb) {
    const fileName = `${req.body.userId}.png`; // Set the filename as userId.png or any desired format
    cb(null, fileName);
  },
});

const screenshotUploader = multer({ storage: screenshotUpload });

app.post('/results', screenshotUploader.single('screenshot'), (req, res) => {
  const userId = req.body.userId; // Retrieve the userId from the request body

  if (req.file && userId) {
    const fileName = `${userId}.png`; // Set the filename as userId.png
    // Rename the file with the desired filename
    fs.renameSync(req.file.path, path.join(req.file.destination, fileName));
    console.log('Screenshot received:', fileName);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});





//delete marksheet




// DELETE endpoint to delete a marksheet
app.delete('/results/:userId', (req, res) => {
  const { userId } = req.params;
  const marksheetPath = path.join(__dirname, 'results', `${userId}.png`);
  console.log('userId:', userId);
  console.log('marksheetPath:', marksheetPath);
  fs.unlink(marksheetPath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete marksheet' });
    } else {
      res.json({ message: 'Marksheet deleted successfully' });
    }
  });
});

















//

app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/parent', parentRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



































//** */