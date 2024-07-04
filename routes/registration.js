const express=require("express");   // Importing the Express framework
const router=express();             // Creating an instance of Express router

// Importing the 'registration' controller
const registration=require('../controller/registration')

// Route to handle GET requests to '/registration'
router.get('/registration',registration.getregistration)

// Route to handle POST requests to '/registration'
router.post('/registration',registration.postregistration)

// Exporting the router to be used in other parts of the application
module.exports=router;