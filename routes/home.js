const express=require("express");   // Importing the Express framework
const router=express();             // Creating an instance of Express router
const home=require('../controller/home');// Importing the 'home' controller

// Route to handle GET requests to the root URL ('/')
router.get('/',home.gethome);    

// Route to handle GET requests to '/myprofile'
router.get('/myprofile',home.getmyprofile);

// Route to handle POST requests to '/creatgp'
router.post('/creatgp',home.postcreatgp);

// Route to handle POST requests to '/addmember'
router.post('/addmember',home.postaddmember);

// Route to handle POST requests to '/gpstatus'
router.post('/gpstatus',home.postgpstatus);

// Exporting the router to be used in other parts of the application
module.exports=router;