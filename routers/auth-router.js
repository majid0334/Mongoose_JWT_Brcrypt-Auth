const express = require("express");
const router = express.Router();
const controller = require("./../controllers/auth-controller");

//För regestera datan
router.post("/register", controller.register);
//För att posta data funktion
router.post("/login", controller.login);

module.exports = router;
