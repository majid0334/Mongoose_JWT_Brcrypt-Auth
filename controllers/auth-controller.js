const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/user-model");

//FIll får var autoosering
module.exports = {
  //För att regetera
  register: async (req, res) => {
    try {
      //För att kunna skicka in mail, lösonrd och namn
      const { name, email, password } = req.body;

      //FÖr att undevika skriva samma gmail
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).send("Email is in use");
        return;
      }

      //För att kriptera lösonrt med hjälp av hash 123vnigni?+lösonrdet
      const hashedPassword = await bcrypt.hash(password, 10);
      //För att skicka data till dabasen och sedan skcika den
      await User.create({ name, email, password: hashedPassword });

      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server server error");
    }
  },

  //Logga in som exesternade användare
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      //För att häma lösoenrd ord gmail
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        res.status(400).send("Invalid credential!");
        return;
      }

      //Jämföra nuvårande och kryptyrade lösneorder
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        res.status(400).send("Invalid credential!");
        return;
      }

      const payload = {
        id: user._id,
        role: "ADMIN",
        name: user.name,
      };
      //skapar token och signerar den
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.send({ token });
    } catch (err) {
      console.log(err);
      res.status(500).send("internal server server error");
    }
  },
};
