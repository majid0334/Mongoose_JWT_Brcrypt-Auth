const mongoose = require("mongoose");

//SKapar struktur för datanasen
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

//Namn för databsaen
module.exports = mongoose.model("Contact", contactSchema);
