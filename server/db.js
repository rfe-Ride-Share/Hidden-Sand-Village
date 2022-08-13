const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose
  .connect('mongodb://localhost:27017/sandy')
  .then(() => console.log('connected to MongoDB...'))
  .catch((err) => console.log(err));

const tripSchema = new Schema({
  date: { type: Date, default: Date.now },
  depart_time: String,
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  driver: { type: String, required: true },
  passengers: [
    { name: { departure: String, destination: String, status: String } },
  ],
  price: Number,
  duration: String,
  status: String, // pending/done/cancelled/upcoming/full/
});

const Trip = mongoose.model('Trip', tripSchema);

function createTrip(data) {
  Trip.create(data, function (err) {
    if (err) return handleError(err);
  });
}

const userSchema = new Schema({
  user_id: { type: String, required: true },
  user_photo: String,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  reviews: [{ stars: Number, review_text: String }],
  bio: String,
  current_trip: Schema.Types.ObjectId,
  past_trips: [Schema.Types.ObjectId],
  future_trips: [Schema.Types.ObjectId],
});

const user = mongoose.model('User', userSchema);

function createUser(data) {
  user.create(data, function (err) {
    if (err) return handleError(err);
  });
}

function getProfileData(id) {}

function postProfileData(id) {}
// user
//  picture
//  name
//  reviews
//  bio
// current past and future trips

// chat
