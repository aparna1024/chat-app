const { createServer } = require('http');       // Importing createServer function from Node's HTTP module
const { Server } = require('socket.io');        // Importing Server class from socket.io

// Importing  models
const gpmessgModel = require('./models/gpMessgModel');
const userModel = require('./models/userModel');
const oneToOneMessgModel = require('./models/oneToOneMessgModel');

let users = {};             // Object to store users with their socket IDs
let currentGroup = null;    // Variable to track the current group ID
let u = [];                 // Array to store socket IDs by user ID


// Function to initialize socket.io and handle socket events
function initializeSocket(server) {
    const io = new Server(server);      // Creating a socket.io server instance attached to the HTTP server

    // Event listener for new socket connections
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);     // Logging when a user connects

        // Event listener for joining a group
        socket.on('joinGroup', (gpid) => {
            users[socket.id] = gpid;    // Storing the group ID with the socket ID
            if (currentGroup !== null && currentGroup !== gpid) {
                socket.leave(currentGroup);     // Leaving the previous group if different
                console.log("Previous group ID has been left!!!");
            }
            currentGroup = gpid;    // Updating the current group ID
            socket.join(gpid);      // Joining the new group
        });

        // Event listener for when a user connects
        socket.on("user_connected", (id) => {
            u[id] = socket.id;      // Storing the socket ID with the user ID
            io.emit("user_connected", id);  // Emitting a user_connected event to all clients
        });

        // Event listener for group messages
        socket.on('gpmessg', (msg, cuid, time, date, x) => {
            // Creating a new group message in the database
            gpmessgModel.create({ messg: msg, gpid: x, gpMemberid: cuid, date: date, time: time }).then(function (d) {
                // Finding the user who sent the message
                userModel.find({ _id: cuid }).then(function (u) {
                    io.to(x).emit('gpmessg', d, u);     // Emitting the message to all clients in the group
                });
            });
        });

        // Event listener for private messages
        socket.on('sendPrivateMessage', ({ msg, cuid, time, date, recipientId }) => {
            var socketId = u[recipientId];      // Getting the socket ID of the recipient
            // Creating a new one-to-one message in the database
            oneToOneMessgModel.create({ messg: msg, senderid: cuid, reciverid: recipientId, date: date, time: time }).then(function (ok) {
                // Emitting the private message to the recipient
                io.to(socketId).emit("privateMessage", msg, recipientId, time, date, cuid);
            });
        });

        // Event listener for when a user disconnects
        socket.on('disconnect', () => {
            console.log('user disconnected');
            delete users[socket.id];    // Removing the user from the users object
        });
    });

    return io;      // Returning the socket.io instance
}

// Exporting the initializeSocket function
module.exports = initializeSocket;
