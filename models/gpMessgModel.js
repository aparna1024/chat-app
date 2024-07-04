const mongoose=require("mongoose");     // Importing the Mongoose library for MongoDB interaction

// Defining a new Mongoose schema for group messages
const groupMessgSchema=new mongoose.Schema({
    messg:String,
    gpid:String,
    gpMemberid:String,
    date:String,
    time:String,
})
// Creating a Mongoose model named "groupMessg" based on the groupMessgSchema
const groupMessgis=mongoose.model("groupMessg",groupMessgSchema);
// Exporting the groupMessg model to be used in other parts of the application
module.exports=groupMessgis;