const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const collection = require("./config");

const app = express();

//convert data into json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// app.get("home", (req, res) => {
//   res.render("home");
// });

//register new users
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  //check if the user already exist in DB
  const exitingUser = await collection.findOne({ name: data.name });
  if (exitingUser) {
    res.send("User Already Exists, Please Choose differnet Username");
  } else {
    //hash the pw using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("Username cannot Found");
    }

    //comapre the password from db with plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("home");
    } else {
      req.send("Wrong Password");
    }
  } catch {
    res.send("Wrong Details");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
