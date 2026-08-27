const express = require('express');
const { handleGenerateNewShortUrl, handleRedirectToOriginalUrl, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();
router.post('/', handleGenerateNewShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

router.get('/:shortId', handleRedirectToOriginalUrl);

module.exports = router;