const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    booking_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    design_id: {
      type: String,
      required: true,
    },
    artist_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date(); 
        },
        message: 'Date must be in the future',
      },
    },
    status: {
      type: String,
      enum: ['booked', 'completed', 'canceled'],
      default: 'booked',
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Booking', BookingSchema);
