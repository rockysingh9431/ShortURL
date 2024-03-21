const express = require("express");
const URL = require("../models/urlSchema");
const router = express.Router();
const { restrictTo } = require("../middlewares/auth");
router.get("/admin", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

// inline middleware
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});
router.get("/signup", async (req, res) => {
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  return res.render("login");
});
module.exports = router;
