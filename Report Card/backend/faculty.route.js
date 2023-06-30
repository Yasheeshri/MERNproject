

//Final:- works for registration and login
const express = require('express');
const facultyRoute = express.Router();
const faculty = require('./faculty.model');
const cors = require('cors');

// Route to handle faculty registration
facultyRoute.post('/facultyregister', (req, res) => {
  const {
    userId,
    password,
    name,
    mobileNumber,
    dob,
    email,
    gender,
    address,
  } = req.body;

  const { city, state, pincode } = address;

  const formData = {
    
    userId,
    password,
    name,
    mobileNumber,
    dob,
    email,
    gender,
    address:{
      city,
      state,
      pincode
    },

  };

faculty.create(formData)
.then(savedFaculty => {
  res.status(200).json({ 'faculty': 'Faculty Registered Successfully', 'data': savedFaculty });
})
.catch(error => {
  console.error('Error registering faculty:', error);
  res.status(400).send('Failed to register faculty');
});
});






// faculty Login
facultyRoute.route('/facultylogin/:fid/:fpass').get(function (req, res) {
  var id = req.params.fid;
  var pass = req.params.fpass;
  faculty.findOne({
    userId: id,
    password: pass
  })
    .then(faculty => {
      if (faculty) {
        console.log(faculty);
        res.send(faculty);
      } else {
        res.status(400).send('Invalid login credentials');
      }
    })
    .catch(err => {
      res.status(400).send('Data not found, something went wrong');
    });
});





//Admin Faculty Show 

facultyRoute.route('/facultyshow').get(function (req, res) {
  faculty.find({})
    .then(faculties => {
      res.send(faculties);
    })
    .catch(err => {
      res.status(400).send('Data not found, something went wrong');
    });
  });


//Admin Faculty Search


//search works for seaching the object based on userId
facultyRoute.route
  ('/facultysearch/:userId').
  get(function (req, res) {
    var id = req.params.userId;
    faculty.find({ "userId": id })
      .then(faculties => {
        console.log(faculties);
        res.send(faculties);
      }).catch(err => {
        res.status(400).send
          ("data not found somthing went rong");
      });
  });



//** */
//Admin updates Faculty details 
//will fetch first then update
// Fetch Faculty details
facultyRoute.get('/facultydetails/:userId', (req, res) => {
  const userId = req.params.userId;

  faculty.findOne({ userId })
    .then(faculty => {
      if (!faculty) {
        return res.status(404).json({ error: 'faculty not found' });
      }
      res.status(200).json(faculty);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch faculty details' });
    });
});

// Update Faculty details
facultyRoute.put('/facultyupdate/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  faculty.findOneAndUpdate({ userId }, updatedData, { new: true })
    .then(faculty => {
      if (!faculty) {
        return res.status(404).json({ error: 'faculty not found' });
      }
      res.status(200).json({ message: 'faculty details updated successfully', student });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update student details' });
    });
});

//
//** */




//Admin Makes the facultystatus Inactive

facultyRoute.put("/facultyupdate/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedStatus = req.body.facultystatus;

  faculty.findOneAndUpdate({ userId }, { $set: { facultystatus: updatedStatus } })
    .then(() => {
      res.send("faculty status updated successfully");
    })
    .catch((err) => {
      res.status(400).send("Error updating faculty status");
    });
});



module.exports = facultyRoute;























