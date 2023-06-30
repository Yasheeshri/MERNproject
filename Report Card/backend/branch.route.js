const express=require('express');
const branchRoute=express.Router();
let Branch=require('./branch.model');
const mongoose=require("mongoose");
//to save data in monngodb server from client
//postman url :-
//select POST method and paste this url in postman http://localhost:5000/branch/branchsave/123/ExampleBranch/Active
branchRoute.route('/branchsave/:bcode/:bname/:bstatus').post(function(req,res){
let b={
    bcode:req.params.bcode,
    bname:req.params.bname,
    bstatus:req.params.bstatus,
    bcreatedon:Date.now(),
    bupdatedon:Date.now()
}
let branch=new Branch(b);
branch.save().then(branch=>{
    res.status(200).json({'branch':'Branch Added Successfully'+branch});
}).catch(error=>{
    res.status(400).send("Unable To Send Data to The Database");
});
});


//update
// choose PUT method and paste this url in postman localhost:5000/branch/branchupdate/222/tabrej/Active
branchRoute.route('/branchupdate/:bcode/:bname/:bstatus').put(function(req,res){
    var id=req.params.bcode;
    var name=req.params.bname;
    var st=req.params.bstatus;
    let branch=new Branch();

    Branch.updateOne({"bcode":id},{"bcode":id,"bname":name,"bstatus":st,"bupdatedon":Date.now()}).then(branch=>{
        res.status(200).json({'branch':'Branch Updated Successfully'+branch});
    }).catch(error=>{
        res.status(400).send("Unable To Save Data In The Database");
    });
});


//delete
//select GET methoid and paste this url in postman  localhost:5000/branch/branchdelete/111
branchRoute.route('/branchdelete/:bcode').get(function(req,res){
    var id=req.params.bcode;
    Branch.updateOne({"bcode":id},{"bstatus":"Inactive","bupdatedon":Date.now()}).then(branch=>{
        console.log(branch);
        res.send("Branch Deleted  Successfully"+branch);
    }).catch(error=>{
        res.status(400).send('Data Not Found,Something Went Wrong');
    });
});



//show all branches
//select GET method and paste this link in postman  localhost:5000/branch/branchshow
branchRoute.route('/branchshow').get(function(req,res){
    Branch.find().then(branch=>{
        console.log(branch);
        res.send(branch);
    }).catch(error=>{
        res.status(400).send("Data Not Found,Something Went Wrong");
    });
});
module.exports=branchRoute;
