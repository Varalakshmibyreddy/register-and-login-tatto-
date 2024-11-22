const express = require('express');
const { body, param } = require('express-validator');
const bookingController = require('../Controllers/bookingController')

const router = express.Router();

// Validation middleware
const validateBookingCreation = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('design_id').notEmpty().withMessage('Design ID is required'),
  body('artist_id').notEmpty().withMessage('Artist ID is required'),
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => value > new Date())
    .withMessage('Date must be in the future'),
];

const validateBookingReschedule = [
  param('booking_id').notEmpty().withMessage('Booking ID is required'),
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => value > new Date())
    .withMessage('New date must be in the future'),
];

const validateBookingCancellation = [
  param('booking_id').notEmpty().withMessage('Booking ID is required'),
];

// Routes
router.post('/', validateBookingCreation, bookingController.createBooking);

router.put('/:booking_id/reschedule', validateBookingReschedule, bookingController.rescheduleBooking);
router.delete('/:booking_id/cancel', validateBookingCancellation, bookingController.cancelBooking);

module.exports = router;
