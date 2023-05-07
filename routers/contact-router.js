const express = require("express");
const router = express.Router();
const controller = require("./../controllers/contact-controller");

const authMiddleware = require("./../middlewares/auth-middleware");

//För att kunna hämta data funktion
router.get("/", controller.getAllContacts);

//För att posta data funktion
router.post("/", authMiddleware, controller.createContact);

module.exports = router;
