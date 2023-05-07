const mongoose = require("mongoose");

//För vår inlogning
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

//Vår databas namn
module.exports = mongoose.model("User", userSchema);
