
//*****Final for login and registration

const express = require('express');
const studentRoute = express.Router();
const Student = require('./student.model');
const app=express();
//Student Registration
studentRoute.route('/studentregister').post(function (req, res) {
  let student = new Student(req.body);
  
  student.save()
    .then(student => {
      alert(student.userId);
      res.status(200).json({
        'student': 'Registration Successful: ' + student
      });
    })
    .catch(err => {
      res.status(400).send("Unable to save to Database");
    });
});





// Student Login

studentRoute.route('/studentlogin/:sid/:spass').get(function (req, res) {
var id = req.params.sid;
var pass = req.params.spass;
Student.findOne({
userId: id,
password: pass
})
.then(student => {
if (student) {
console.log(student);
res.send(student);
} else {
res.status(400).send('Invalid login credentials');
}
})
.catch(err => {
res.status(400).send('Data not found, something went wrong');
});
});




// Student Show
studentRoute.route('/studentshow').get(function (req, res) {
  Student.find({})
    .then(students => {
      res.send(students);
    })
    .catch(err => {
      res.status(400).send('Data not found, something went wrong');
    });
  });
  
  
//


//search works for seaching the object based on userId
studentRoute.route
  ('/studentsearch/:userId').
  get(function (req, res) {
    var id = req.params.userId;
    Student.find({ "userId": id })
      .then(students => {
        console.log(students);
        res.send(students);
      }).catch(err => {
        res.status(400).send
          ("data not found somthing went rong");
      });
  });



//











//Admin updates student details 
//will fetch first then update
// Fetch student details
studentRoute.get('/studentdetails/:userId', (req, res) => {
  const userId = req.params.userId;

  Student.findOne({ userId })
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch student details' });
    });
});

// Update student details
studentRoute.put('/studentupdate/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  Student.findOneAndUpdate({ userId }, updatedData, { new: true })
    .then(student => {
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json({ message: 'Student details updated successfully', student });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update student details' });
    });
});

//


//Admin Makes the studentstatus Inactive

studentRoute.put("/studentupdate/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedStatus = req.body.studentstatus;

  Student.findOneAndUpdate({ userId }, { $set: { studentstatus: updatedStatus } })
    .then(() => {
      res.send("Student status updated successfully");
    })
    .catch((err) => {
      res.status(400).send("Error updating student status");
    });
});


module.exports = studentRoute;











































































