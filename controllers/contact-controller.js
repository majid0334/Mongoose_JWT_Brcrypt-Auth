const Contact = require("../models/contact-model");

//Skriver alla var funktioner serversidan och kunna kalla dom i router filen för dinarre strukur
module.exports = {
  //Hämta alla contqcter
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.send(contacts);
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server server error");
    }
  },

  //Create contact
  createContact: async (req, res) => {
    try {
      //PLockar ut name och body från vår model och disktrukrear den
      const { name, phone } = req.body;
      //Skickar info
      const contact = await Contact.create({ name, phone });
      res.status(201).send(contact);
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server server error");
    }
  },
};
