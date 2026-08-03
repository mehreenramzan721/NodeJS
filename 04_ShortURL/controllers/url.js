const { nanoid } = require('nanoid');
const Url = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url){return res.status(400).json({error: "Missing required field: url"})}
    const shortID = nanoid(8);
    await Url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    res.json({ Id: shortID });
}


module.exports = {
    handleGenerateNewShortUrl
}