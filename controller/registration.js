const express = require("express");         // Importing the Express framework
const app=express();                        // Creating an instance of Express application
const path=require("path")                  // Importing the path module for working with file and directory paths
var session=require("express-session")      // Importing express-session middleware for handling user sessions
const bcrypt=require("bcrypt");             // Importing bcrypt for hashing passwords
const soltrount=10;                         // Setting salt rounds for bcrypt hashing
const userModel=require("../models/userModel")  // Importing the userModel for interacting with user data

app.use(
    session({
      secret: "sharma",
      resave: true,
      saveUninitialized: true,
    })
);
app.use(express.json());        // Middleware to parse incoming JSON requests and make the data available in req.body

app.use(express.urlencoded({ extended: true }));    // Middleware to parse URL-encoded data with the querystring library (extended: true uses qs library for parsing)

// Controller function to render the registration form if the user is not logged in
exports.getregistration=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        // Render the 'registration' view if isLoggedIn is false (user is not logged in)
    res.render('registration')
    }
}

// Controller function to handle user registration process
exports.postregistration=async(req,res,next)=>{
    username=req.body.username;         // Extract username from request body
    email=req.body.email;               // Extract email from request body
    password=req.body.password;         // Extract password from request body

    // Generate a salt using bcrypt
    const salt=await bcrypt.genSalt(soltrount);

    // Hash the password using the generated salt
    const hash=await bcrypt.hash(req.body.password,salt);

    // Check if a user with the provided email already exists in userModel
    userModel.findOne({email:email}).then(function(data){
        if(data){
            // Log message if user already exists
            console.log("user already exist")
        }else{
            // If user does not exist, create a new user in userModel with hashed password and default profile image
            userModel.create({username:username,email:email,password:hash,profileimg:"./img/bydefaultprofilepic.png"}).then(function(data){
                console.log("new user for registration and user registered!!!");    // Log success message
                res.redirect('/login'); // Redirect to login page after successful registration
            })
        }
    })  
}