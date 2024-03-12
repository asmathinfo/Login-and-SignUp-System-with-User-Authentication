const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/login-sys");

connect
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//create schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Model

const collection = new mongoose.model("users",LoginSchema);

module.exports =collection;