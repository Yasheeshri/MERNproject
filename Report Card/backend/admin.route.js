const express = require('express');
const adminRoute = express.Router();
const Admin = require('./admin.model');



adminRoute.route('/adminlogin/:aid/:apass').get(function (req, res) {
    var id = req.params.aid;
    var pass = req.params.apass;
    Admin.findOne({
        adminId: id,
      password: pass
    })
      .then(admin => {
        if (admin) {
          console.log(admin);
          res.send(admin);
        } else {
          res.status(400).send('Invalid login credentials');
        }
      })
      .catch(err => {
        res.status(400).send('Data not found, something went wrong');
      });
  });
  
  
  
  
  
  
  
  
  
  
  module.exports = adminRoute;
  