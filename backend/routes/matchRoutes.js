// routes/matchRoutes.js
const express = require('express');
const { getCurrentMatch, updateScore } = require('../controllers/matchController');
const router = express.Router();

router.get('/current', getCurrentMatch);     // Get current score and overs
router.post('/score', updateScore);          // Update score for current ball

module.exports = router;
