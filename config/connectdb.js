const mongoose= require("mongoose");
// Function to connect to MongoDB database
const DB= async function(DatabaseUrl){
    try{
        // Connect to MongoDB using the provided DatabaseUrl
        await mongoose.connect(DatabaseUrl)
        console.log("connected to mongodb");    // Log a success message if connection is successful
        }
        catch(err){
            console.log(err);   // Log an error message if connection fails
        }
}
module.exports = DB;    // Export the DB function to be used elsewhere in the application