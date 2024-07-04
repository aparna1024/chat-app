const express=require("express");   // Importing the Express framework
const router=express();             // Creating an instance of Express router
const login=require('../controller/login'); // Importing the 'login' controller

// Route to handle GET requests to '/login'
router.get('/login',login.getlogin)

// Route to handle POST requests to '/login'
router.post('/login',login.postlogin);

// Route to handle GET requests to '/logout'
router.get('/logout',login.getlogout)

// Exporting the router to be used in other parts of the application
module.exports=router;