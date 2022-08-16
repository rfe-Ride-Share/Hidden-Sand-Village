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
  return Trip.create(data);
}

function deleteTrip(id) {
  return Trip.deleteOne(id).exec(); // {deletedCount: 1}
}

function findTrip(id) {
  return Trip.findOne(id).exec();
}

function updateTrip(id, data) {
  return Trip.findOneAndUpdate(id, data);
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

const User = mongoose.model('User', userSchema);

function findOneAndUpdateUser(id, data) {
  return User.findOneAndUpdate({ user_id: id }, data).exec();
}

function createUser(data) {
  return User.create(data);
}

function deleteUser(id) {
  return User.deleteOne({ user_id: id }).exec(); // {deletedCount: 1}
}

function getProfileData(id) {
  return User.findOne({ user_id: id }).exec();
}

function postProfileData(data) {}
// user
//  picture
//  name
//  reviews
//  bio
// current past and future trips
// chat
module.exports = {
  createTrip,
  deleteTrip,
  findTrip,
  updateTrip,
  createUser,
  findOneAndUpdateUser,
  getProfileData,
  deleteUser,
};
