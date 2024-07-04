const userModel= require('../models/userModel');                    // Importing the user model, which interacts with the database for user-related operations.
const groupModel=require('../models/groupModel');                   // Importing the group model, which handles database operations related to groups.
const groupMemberModel=require('../models/groupMemberModel');       // Importing the group member model, which deals with the database operations for group members. 
const gpMessgModel=require('../models/gpMessgModel');               // Importing the group message model, which is used to interact with the database for group messages.
const oneToOneMessgModel=require('../models/oneToOneMessgModel');   // Importing the one-to-one message model, which is used for database operations involving one-to-one messages.
const express = require("express");                                 // Importing the Express framework, which is used to create the web application.
const app=express();                                                // Creating an instance of an Express application.
let session=require("express-session")                              // Importing and setting up the express-session middleware for handling user sessions.


app.use(
    session({
      secret: "sharma",
      resave: true,
      saveUninitialized: true,
    })
);
app.use(express.json());                                            // Middleware to parse incoming JSON requests and populate the req.body property.
app.use(express.urlencoded({ extended: true }));                    // Middleware to parse URL-encoded data with the querystring library (extended: true uses qs library for parsing).


//-----------------Controller function for home page -------------------------
exports.gethome=(req,res,next)=>{
    // check user id loggedin or not 
    if(req.session.isLoggedIn){
        const curruser={
            userid:req.session.curruserid,
            username:req.session.username,
            userprofilepic:req.session.userprofile,
        }

        // Fetch all users from the userModel.
        userModel.find().then(function(data){

            // Fetch group members where gpMemberid matches the current user's session ID.
            groupMemberModel.find({gpMemberid:req.session.curruserid}).then(function(gpm){

                // Fetch all groups from the groupModel.
                groupModel.find().then(function(gp){

                     // Fetch all group messages from the gpMessgModel.
                    gpMessgModel.find().then(function(gpmess){

                        // Fetch all one-to-one messages from the oneToOneMessgModel.
                        oneToOneMessgModel.find().then(function(onetoonemessg){
                            // send user data and gpdata and messg corresponding to the login user 
                            res.render('home',{curruser:curruser,alluser:data,gpmember:gpm,gp:gp,gpmess:gpmess,onetoonemessg:onetoonemessg});
                        })
                    })
                
                })
            })
        })
       
    }else{
        // when user not login redirect to login page
        res.redirect('/login');
    }
}

// ------------------Controller function to user's profile page if logged in, otherwise redirect to login --------------------------
exports.getmyprofile=(req,res,next)=>{
    // Check if the user is logged in based on session variable
    if(req.session.isLoggedIn){
        // If logged in, create an object with current user details from session
        const curruser={
            userid:req.session.curruserid,
            username:req.session.username,
            userprofilepic:req.session.userprofile,
        }
        // Render the 'myprofile' view and pass current user details to it
        res.render('myprofile',{curruser:curruser});
    }else{
        // If not logged in, redirect to the login page
        res.redirect('/login');
    }
}

// ----------Controller function, when user want to creat new group---------------------------
exports.postcreatgp=(req,res,next)=>{
    // Check if the user is logged in based on session variable
    if(req.session.isLoggedIn){
        // Extract group name, user ID, and group creation date from request body
        const gpname=req.body.gpname;       // Group name from request body
        const id=req.session.curruserid;    // User ID of the group creator from session
        const gpcreatedate=req.body.gpcreatedate;   // Group creation date from request body

        if(gpname==null){
            res.status(204);
            res.send();
        }else{
         // Create a new group in groupModel collection
        groupModel.create({gpname:gpname,gpcreatedBy:id,date:gpcreatedate}).then(function(data){
            // After successfully creating the group, add the creator as a member of the group
            groupMemberModel.create({gpid:data._id,gpMemberid:id,date:gpcreatedate,status:true}).then(function(d){
                console.log("gp created successfully!!!");  // Send 200 status code (OK)
                console.log("member is added in gp");   // Send the created group data in the response
                res.status(200);
                res.send(data);
            })
        })
    }
    }else{
        // If not logged in, redirect to the login page
        res.redirect('/login');
    }
}

// ---------------Controller function to add new member into group----------------------
exports.postaddmember=(req,res,next)=>{
    // Check if the user is logged in based on session variable
    if(req.session.isLoggedIn){
        const gpid=req.body.gpid;   // Group ID from request body
        const userid=req.body.userid;   // User ID of the new member from request body
        const date=req.body.date;   // Date when the member is added from request body
        const status=false;     // Initial status (false means pending) for the new member

        const check=groupMemberModel.findOne({gpid:gpid,gpMemberid:userid}).then(function(a){
            // check member alrady exist in group or not
            if(a==null){
                // If member does not exist in the group, create a new group member entry
                groupMemberModel.create({gpid:gpid,gpMemberid:userid,date:date,status:false}).then(function(d){
                    console.log("member is added in gp");
                    res.status(200);    // Send success status code
                    res.send();     // Send empty response
                })
            }else{
                console.log("member already exist in gp");
                // res.status(300);    // Send custom status code (e.g., 300) indicating member already exists
                res.send();     // Send empty response
            }

        })

    }else{
        // If not logged in, redirect to the login page
        res.redirect('/login');
    }
}

// -----------Controller function to update status , group request is accept or reject-------------
exports.postgpstatus=(req,res,next)=>{
    // Check if the user is logged in based on session variable
    if(req.session.isLoggedIn){
        const gpid=req.body.gpid;   // Group ID from request body
        const uid=req.session.curruserid;   // User ID from session
        const s=req.body.s;                 // New status (accept or reject) from request body

        // Find and update the group member model with the provided group ID and user ID
        groupMemberModel.findOneAndUpdate({gpid:gpid,gpMemberid:uid},{status:s}).then(function(d){
            res.status(200);    // Send a 200 OK status response
            res.send();
        }) 

    }else{
        // If not logged in, redirect to the login page
        res.redirect('/login');
    }
}
