import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 5000;

import Contact from "./models/user.js";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.mongodb_connection_string);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
}

//middleware to parse the body of the request
app.use(express.json());

app.get("/Default", (req, res) => {
  res.send("Hello World");
});

// routes definition
//route for getting all users
app.get("/contact", async (req, res) => {
  try {
    const allContact = await Contact.find();
    res.send(allContact);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
});

//********

//for adding a user
app.post("/Register", async (req, res) => {
  const { firstName, lastName, email, passWord, age, DOB } = req.body;
  try {
    //create a contact using the contact Model
    const contact = new Contact({
      firstName: firstName,
      lastName: lastName,
      email: email,
      passWord: passWord,
      age: age,
      DOB: DOB,
    });
    await contact.save();

    res.send(contact);
  } catch (error) {
    console.log(error);
    res.send("an error occured");
  }
});

//to update user by Id
app.put("/Update/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const { lastName } = req.body;

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId },
      { lastName: lastName },
      { new: true }
    );
    res.send("user updated sucessfully");
  } catch (error) {
    res.send("an error occured");
  }
});

//to delete user by Id
app.delete("/clear/:contactId", async (req, res) => {
  const { contactId } = req.params;

  try {
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    res.send(deleteContact);
  } catch (error) {
    res.send("an error occured");
  }
});

app.listen(port, () => {
  connectToDB();
  console.log("Listen for port 5000");
});
