const mongoose=require("mongoose");     // Importing the Mongoose library for MongoDB interaction

// Defining a new Mongoose schema for one-to-one messages
const oneTooneMessgSchema=new mongoose.Schema({
    messg:String,
    senderid:String,
    reciverid:String,
    date:String,
    time:String,
})

// Creating a Mongoose model named "oneToOneMessg" based on the oneToOneMessgSchema
const oneTooneMessgis=mongoose.model("oneToOneMessg",oneTooneMessgSchema);

// Exporting the oneToOneMessg model to be used in other parts of the application
module.exports=oneTooneMessgis;