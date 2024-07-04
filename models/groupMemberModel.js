const mongoose=require("mongoose");     // Importing the Mongoose library for MongoDB interaction

// Defining a new Mongoose schema for group members
const groupMemberSchema=new mongoose.Schema({
    gpid:String,
    gpMemberid:String,
    date:String,
    status:String,
})

// Creating a Mongoose model named "groupMember" based on the groupMemberSchema
const groupMemberis=mongoose.model("groupMember",groupMemberSchema);

// Exporting the groupMember model to be used in other parts of the applications
module.exports=groupMemberis;