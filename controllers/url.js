const shortId = require("shortid");
const URL = require("../models/urlSchema");
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url not found" });
  const short_id = shortId();
  await URL.create({
    shortId: short_id,
    redirectUrl: body.url,
    visitedHistory: [],
    createdBy:req.user._id
  });
  return res.render("home", {
    id: short_id,
  });
}

async function handleRedirectToUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}
async function handleGetAnalyticsById(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.json({
    totalClicks: result.visitedHistory.length,
    analytics: result.visitedHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToUrl,
  handleGetAnalyticsById,
};
