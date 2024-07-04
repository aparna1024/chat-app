const userModel= require('../models/userModel');        // Importing the userModel for interacting with user data in the database
const bcrypt=require("bcrypt");                         // Importing bcrypt for hashing passwords
const soltrount=10;                                     // Setting the number of salt rounds for bcrypt hashing

// Controller function to update the username of the current user
exports.putupdatename=(req,res)=>{
    const upname=req.body.updatedname       // Extract the updated username from the request body
    const id=req.session.curruserid         // Get the current user's ID from the session
    console.log("req for update name , name= "+upname); // Log the update request with the new username

    // Find the user by ID and update the username
    userModel.findByIdAndUpdate({_id:id},{username:upname}).then(function(d){
        console.log("updatation successfully done!!!"); // Log success message 
        console.log(`udated data= ${d}`);               // Log the updated data
        res.status(200);                                // Send a 200 status code (OK)
        res.send();
    }) 
}

// Controller function to update the user's password
exports.putupdatepasswd=async(req,res)=>{
    const updatepasswd=req.body.updatepasswd    // Extract the updated password from the request body
    const id=req.session.curruserid             // Get the current user's ID from the session

    // Generate a salt and hash the updated password using bcrypt
    const salt=await bcrypt.genSalt(soltrount);
    const hash=await bcrypt.hash(updatepasswd,salt);
    // Find the user by ID and update the password field with the hashed password
    userModel.findByIdAndUpdate({_id:id},{password:hash}).then(function(d){
        console.log("updatation successfully done!!!");
        console.log(`udated data= ${d}`);   
        res.status(200);// Send HTTP status 200 (OK) to indicate success
        res.send();
    })
   
}

// Controller function to update the user's profile image
exports.putupdateimg=(req,res)=>{
    console.log("update profile img!!!");
    const id=req.session.curruserid         // Get the current user's ID from the session
    const profileimg=req.file               // Get the uploaded file from the request

    // Find the user by ID and update the profileimg field with the uploaded file's filename
    userModel.findByIdAndUpdate({_id:id},{profileimg:profileimg.filename}).then(function(d){
        console.log("updatation successfully done!!!");
        res.redirect('/myprofile'); // Redirect to the user's profile page after successful update
    })
}


