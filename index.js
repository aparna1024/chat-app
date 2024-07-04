const { createServer } = require('http');       // Importing the createServer function from Node's HTTP module
const DB= require("./config/connectdb");        // Importing the DB function to connect to the database
const express=require("express");               // Importing the Express framework
const app=express();                            // Creating an instance of Express
const bodyParser=require("body-parser");        // Importing bodyParser to parse incoming request bodies
const path=require("path")                      // Importing the path module for working with file and directory paths

const multer=require('multer');                 // Importing multer for handling file uploads
const upload=multer({dest:'uploads'})           // Setting up multer to store uploaded files in the 'uploads' directory
app.use(express.static('uploads'));             // Serving static files from the 'uploads' directory
app.use(upload.single("updatedpimg"));          // Using multer middleware to handle single file uploads with the field name "updatedpimg"

// Import the initializeSocket function from socket.js
const initializeSocket = require('./socket');

// Creating an HTTP server instance using Express
const server = createServer(app);   

// Initializing socket.io with the created HTTP server
const io = initializeSocket(server);

// Importing dotenv module for environment variables
const dotenv=require("dotenv");
// Loading environment variables from .env file
dotenv.config();

const port=process.env.port     // Reading port number from environment variables
const DatabaseUrl=process.env.DATABASE_URL      // Reading database URL from environment variables

// Importing express-session module for session management
var session=require('express-session');
app.use(session({
    secret:"sharma",    // Secret used to sign the session ID cookie (can be any string)
    resave:true,        // Forces the session to be saved back to the session store, even if the session was not modified during the request
    saveUninitialized:true,     // Forces a session that is "uninitialized" to be saved to the store
}));


// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname,'views')))

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({ extended: false}));

// Set the view engine to use EJS templates
app.set('view engine','ejs');

// Parse incoming requests with JSON payloads
app.use(express.json());

// Importing route handlers
const home=require("./routes/home")
const login=require("./routes/login");
const registration=require("./routes/registration");
const up=require("./routes/updates");

// Mounting route handlers
app.use(home);
app.use(login);
app.use(registration);
app.use(up);

// Middleware to handle 404 errors
app.use((req,res,next)=>{
    res.status(404).send("<h1>page not found</h1>");
})

// Connect to the database and start the server
DB(DatabaseUrl).then(function(){
    server.listen(port,()=>{
        console.log(`server listening at http://localhost:${port}`)
    })
})