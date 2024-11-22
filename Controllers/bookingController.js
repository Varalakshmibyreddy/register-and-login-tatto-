const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { user_id, design_id, artist_id, date } = req.body;

    const newBooking = new Booking({
      booking_id: uuidv4(),
      user_id,
      design_id,
      artist_id,
      date,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reschedule a booking
exports.rescheduleBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { booking_id, status: 'booked' },
      { date },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or not reschedulable' });
    }

    res.status(200).json({ message: 'Booking rescheduled successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;

    const booking = await Booking.findOneAndUpdate(
      { booking_id, status: 'booked' },
      { status: 'canceled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or already canceled' });
    }

    res.status(200).json({ message: 'Booking canceled successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
