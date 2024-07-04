const express=require("express");       // Importing the Express framework
const router=express();                 // Creating an instance of Express router
// Importing the 'update' controller
const update=require('../controller/update');       

// Route to handle PUT requests to '/upname'
router.put('/upname',update.putupdatename);

// Route to handle POST requests to '/upimg'
router.post('/upimg',update.putupdateimg);

// Route to handle PUT requests to '/updatepasswd'
router.put('/updatepasswd',update.putupdatepasswd);

// Exporting the router to be used in other parts of the application
module.exports=router;