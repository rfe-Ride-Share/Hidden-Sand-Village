const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  depart_coord: { lat: Number, lng: Number },
  title: String,
  description: String,
  dest_coord: { lat: Number, lng: Number },
  distance: Number,
  distance_str: String,
  date: { type: Date, default: Date.now },
  depart_time: String,
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  driver_email: { type: String, required: true },
  passengers: [
    { email: String, departure: String, destination: String, status: String },
  ],
  passenger_capacity: Number,
  price: Number,
  duration: String,
  seconds: Number,
  status: String, // pending/done/cancelled/upcoming/full/
});

module.exports = mongoose.model('Trip', tripSchema);
