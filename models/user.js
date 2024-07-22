import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passWord: String,
  age: Number,
  DOB: String,
});

const Contact = mongoose.model("contact", contactSchema);

export default Contact;
