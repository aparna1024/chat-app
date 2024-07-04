const mongoose=require("mongoose");     // Importing the Mongoose library for MongoDB interaction

// Defining a new Mongoose schema for groups
const groupSchema=new mongoose.Schema({
    gpname:String,
    gpcreatedBy:String,
    date:String
})
// Creating a Mongoose model named "group" based on the groupSchema
const group=mongoose.model("group",groupSchema);
// Exporting the group model to be used in other parts of the application
module.exports=group;