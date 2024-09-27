const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// User can book a seat (JWT required)
router.post('/book', authenticateToken, bookSeat);

// User can get booking details (JWT required)
router.get('/:bookingId', authenticateToken, getBookingDetails);

module.exports = router;
