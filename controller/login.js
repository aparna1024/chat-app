// Importing the userModel for interacting with user data in the database
const userModel= require('../models/userModel');

// Importing the Express framework to create the web application
const express = require("express");
const app=express();    // Creating an instance of Express application

// Importing express-session middleware for handling user sessions
let session=require("express-session")

// Importing bcrypt for hashing passwords
const bcrypt=require("bcrypt");
app.use(
    session({
      secret: "sharma",
      resave: true,
      saveUninitialized: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// logout session
// Controller function to logout the user by clearing session variables and redirecting to login page
exports.getlogout=(req,res,next)=>{
    // Clear session variables related to user authentication
    req.session.isLoggedIn=false;// Set isLoggedIn to false
    req.session.email=null;     // Clear email from session
    req.session.username=null;  // Clear username from session
    res.redirect('/login')      // Redirect to the login page
}

// Controller function to render the login page if the user is not logged in
exports.getlogin=(req,res,next)=>{
    if(!req.session.isLoggedIn){
    res.render('login');    // Render the 'login' view if isLoggedIn is false (user is not logged in)
    }
}

// Controller function to handle user login
exports.postlogin=(req,res,next)=>{
    const email=req.body.email;     // Extract email from request body
    const password=req.body.password;   // Extract password from request body

    // Find a user record in the userModel based on the provided email
    userModel.findOne({email:email})
    .then(async function(data){
        if(data)
        {
            const bypass=data.password; // Retrieve hashed password from user record

            // Compare the provided password with the hashed password using bcrypt
            const passwordMatch =await bcrypt.compare(password,bypass);
            if(passwordMatch ){
                // If passwords match, set session variables for user authentication
                req.session.curruserid=data._id;
                req.session.username=data.username;
                req.session.useremail=data.email;
                req.session.userprofile=data.profileimg
                req.session.isLoggedIn=true;
                
                console.log("login successfully!!!");
                res.redirect('/');  // Redirect to the home page after successful login
            }else{
                // If passwords do not match, redirect to the login page
                res.redirect('/login');
            }
        }else{
            // If no user found with the provided email, redirect to the login page
            res.redirect('/login');
        }
    })  
}

