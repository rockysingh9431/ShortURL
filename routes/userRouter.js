const express = require("express");
const router = express.Router();
const { handleUserSignUp, handleUserLogIn } = require("../controllers/user");
router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogIn);
module.exports = router;
