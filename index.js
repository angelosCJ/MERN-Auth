const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://enzokaduri:vilbEtsjo7nHiLd0@crud.bpvgn.mongodb.net/AuthTest?retryWrites=true&w=majority&appName=CRUD");

app.listen(3001,()=>{
    console.log("Server is Running");
});

const bcrypt = require('bcrypt');

// Save the user with a hashed password
app.post("/auth", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UsersModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).send("User saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving user details");
  }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user_record = await UsersModel.findOne({ email: email });
  
      // Check if the user exists
      if (!user_record) {
        return res.status(404).json("User records do not exist");
      }
  
      // Compare the stored hashed password with the incoming password
      const isPasswordValid = await bcrypt.compare(password, user_record.password);
  
      if (isPasswordValid) {
        return res.status(200).json("Log in successful");
      } else {
        return res.status(401).json("Wrong password");
      }
    } catch (error) {
      return res.status(500).json({ message: "An error occurred during authentication", error });
    }
  });
  
