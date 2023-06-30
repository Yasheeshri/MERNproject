const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/dbreportcard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  userId: String,
  password: String,
  name: String,
  enrollmentNumber: String,
  mobileNumber: String,
  dob: String,
  parentsMobile: String,
  fatherName: String,
  motherName: String,
  gender: String,
  address: {
    city: String,
    state: String,
    pincode: String,
  },
  course: String,
  year: String,
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', (req, res) => {
  const newStudent = new Student(req.body);
  newStudent.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving student data');
    } else {
      res.status(200).send('Student data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
