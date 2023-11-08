const generateUniqueId = require('generate-unique-id');
const URL = require('../models/url');

const handleGenerateNewShortURL = async (req, res) => {
    if(!req.body.url){
        return res.status(400).json({ error: 'url required' });
    }
    const shortURL = generateUniqueId({ length: 8 });
    await URL.create({
        shortId: shortURL,
        redirectUrl: req.body.url,
        visitHistory: []
    })

    return res.render("home", {
        id: shortURL
    })
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};