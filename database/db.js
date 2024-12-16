const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load the environment variables
dotenv.config();

// Define MongoDB Connection URL
const mongoURL = process.env.MONGODB_URL;

// Set up the connection to the MongoDB database with options
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// This object is used to interact with the MongoDB database.
const db = mongoose.connection;

// Define Event Listeners for the database connection
db.on("error", (err) => {
  console.error("Error connecting to MongoDB database: ", err);
});

db.once("connected", () => {
  console.log("Connected to MongoDB database successfully");
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB database");
});


module.exports = db;
