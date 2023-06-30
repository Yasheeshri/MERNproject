
const express = require('express');
const parentRoute = express.Router();
const Parent = require('./parent.model');
const Student = require('./student.model');



parentRoute.post('/parentregister', (req, res) => {
  const {
    userId,
    parentName,
    password,
    mobileNumber,
    childUserId,
    address,
  } = req.body;

  const { city, state, pincode } = address;

  // Check if the userId exists in the parent collection
  Parent.findOne({ userId })
    .then(existingParent => {
      if (existingParent) {
        res.status(400).json({ 'error': 'Parent Is Already Registered' });
      } else {
        // Check if the childUserId exists in the parent collection
        Parent.findOne({ childUserId })
          .then(existingParent2 => {
            if (existingParent2) {
              res.status(400).json({ 'error': 'Parent Is Already Registered' });
            } else {
              // Check if the childUserId exists in the student collection
              Student.findOne({ userId: childUserId })
                .then(student => {
                  if (student) {
                    const formData = {
                      userId,
                      parentName,
                      password,
                      mobileNumber,
                      childUserId,
                      address: {
                        city,
                        state,
                        pincode
                      },
                    };

                    Parent.create(formData)
                      .then(savedParent => {
                        res.status(200).json({ 'parent': 'Parent Registered Successfully', 'data': savedParent });
                      })
                      .catch(error => {
                        console.error('Error registering parent:', error);
                        res.status(400).send('Failed to register parent');
                      });
                  } else {
                    res.status(400).json({ 'error': 'Could Not Find The Student' });
                  }
                })
                .catch(error => {
                  console.error('Error finding student:', error);
                  res.status(400).send('Failed to register parent');
                });
            }
          })
          .catch(error => {
            console.error('Error finding parent:', error);
            res.status(400).send('Failed to register parent');
          });
      }
    })
    .catch(error => {
      console.error('Error finding parent:', error);
      res.status(400).send('Failed to register parent');
    });
});








parentRoute.route('/parentupdate/:parentId/:parentName/:parentStatus').get(function (req, res) {
  var id = req.params.parentId;
  var name = req.params.parentName;
  var status = req.params.parentStatus;

  Parent.updateOne({ "parentId": id }, {
    "parentId": id,
    "parentName": name,
    "parentStatus": status,
    "parentUpdatedOn": Date.now()
  })
    .then(parent => {
      res.status(200).json({ 'parent': 'Parent updated successfully' });
    })
    .catch(error => {
      res.status(400).send("Unable to update data in the database");
    });
});

parentRoute.route('/parentdelete/:parentId').get(function (req, res) {
  var id = req.params.parentId;

  Parent.deleteOne({ "parentId": id })
    .then(parent => {
      console.log(parent);
      res.send("Parent deleted successfully");
    })
    .catch(error => {
      res.status(400).send('Data not found, something went wrong');
    });
});

parentRoute.route('/parentshow').get(function (req, res) {
  Parent.find()
    .then(parents => {
      console.log(parents);
      res.send(parents);
    })
    .catch(error => {
      res.status(400).send("Data not found, something went wrong");
    });
});








//parent login
parentRoute.route('/parentlogin/:pid/:ppass').get(function (req, res) {
  var id = req.params.pid;
  var pass = req.params.ppass;
  Parent.findOne({
    childUserId: id,
    password: pass
  })
    .then(parent => {
      if (parent) {
        console.log(parent);
        res.send(parent);
      } else {
        res.status(400).send('Invalid login credentials');
      }
    })
    .catch(err => {
      res.status(400).send('Data not found, something went wrong');
    });
});













// Parent Show
parentRoute.route('/parentshow').get(function (req, res) {
  Parent.find({})
    .then(parents => {
      res.send(parents);
    })
    .catch(err => {
      res.status(400).send('Data not found, something went wrong');
    });
  });
  
  
//








//search works for seaching the object based on userId
parentRoute.route
  ('/parentsearch/:userId').
  get(function (req, res) {
    var id = req.params.userId;
    Parent.find({ "userId": id })
      .then(parents => {
        console.log(parents);
        res.send(parents);
      }).catch(err => {
        res.status(400).send
          ("data not found somthing went rong");
      });
  });



//

















//Admin updates parent details 
//will fetch first then update
// Fetch parents details
parentRoute.get('/parentdetails/:userId', (req, res) => {
  const userId = req.params.userId;

  Parent.findOne({ userId })
    .then(parents => {
      if (!parents) {
        return res.status(404).json({ error: 'Parent not found' });
      }
      res.status(200).json(parents);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch parent details' });
    });
});

// Update student details
parentRoute.put('/parentupdate/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  Parent.findOneAndUpdate({ userId }, updatedData, { new: true })
    .then(parents => {
      if (!parents) {
        return res.status(404).json({ error: 'Parent not found' });
      }
      res.status(200).json({ message: 'Parent details updated successfully', parents });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update parent details' });
    });
});

//










//Admin Makes the parentstatus Inactive

parentRoute.put("/parentupdate/:userId", (req, res) => {
  const userId = req.params.userId;
  const updatedStatus = req.body.parentstatus;

  Parent.findOneAndUpdate({ userId }, { $set: { parentstatus: updatedStatus } })
    .then(() => {
      res.send("Parent status updated successfully");
    })
    .catch((err) => {
      res.status(400).send("Error updating Parent status");
    });
});



module.exports = parentRoute;
