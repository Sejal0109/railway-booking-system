const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const verifyAdminApiKey = require('../middlewares/apiKeyMiddleware');

const router = express.Router();

// Admin can add trains (API key required)
router.post('/add', verifyAdminApiKey, addTrain);

// Users can search trains
router.get('/search', getTrains);

module.exports = router;
