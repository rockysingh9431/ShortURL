const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleRedirectToUrl,
  handleGetAnalyticsById,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectToUrl);
router.get("/analytics/:shortId", handleGetAnalyticsById);
module.exports = router;
