const mongoose=require("mongoose");     // Importing the Mongoose library for MongoDB interaction

// Defining a new Mongoose schema for users
const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    profileimg:String,
    toactive:Boolean,
})
// Creating a Mongoose model named "user" based on the userSchema
const user=mongoose.model("user",userSchema);
// Exporting the user model to be used in other parts of the application
module.exports=user;