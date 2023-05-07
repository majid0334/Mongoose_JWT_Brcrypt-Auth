const express = require("express");
const router = express.Router();
const authRouter = require("./auth-router");
const contactRouter = require("./contact-router");

const authMiddleware = require("./../middlewares/auth-middleware");

//IStället för göra det i app.js gör vi det här för smidaigare och cleana kod och för autotesering
router.use("/api/auth", authRouter);

//IStället för göra det i app.js gör vi det här för smidaigare och cleana kod och för autotesering
router.use("/api/contacts", authMiddleware, contactRouter);

module.exports = router;
