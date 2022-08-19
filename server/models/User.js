const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_photo: String,
  email: String,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  reviews: [{ stars: Number, review_text: String }],
  bio: String,
  current_trip: mongoose.Schema.Types.ObjectId,
  past_trips: [mongoose.Schema.Types.ObjectId],
  future_trips: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('User', userSchema);
