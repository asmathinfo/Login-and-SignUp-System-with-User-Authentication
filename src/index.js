const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const collection =require("./config")

const app = express();

//convert data into json
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//register new users
app.post("/signup",async(req,res)=>{
const data ={
  name : req.body.username,
  password : req.body.password,
}

//check if the user already exist in DB
const exitingUser = await collection.findOne({name:data.name});
if (exitingUser){
  res.send("User Already Exists, Please Choose differnet Username")
}
else{
  
const userdata = await collection.insertMany(data);
console.log(userdata)
}
})

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
