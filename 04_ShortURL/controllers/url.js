const { nanoid } = require('nanoid');
const Url = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) { return res.status(400).json({ error: "Missing required field: url" }) }
    const shortID = nanoid(8);
    await Url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    res.render('home', { shortId: shortID });
}

async function handleRedirectToOriginalUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    res.json({ totalClicks: result.visitHistory.length, visitHistory: result.visitHistory });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectToOriginalUrl,
    handleGetAnalytics
}