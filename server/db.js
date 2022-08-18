/** Not being used anymore. Just keeping it for fun */

// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// require('dotenv').config();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => console.log('connected to MongoDB...'))
//   .catch((err) => console.log(err));

// const tripSchema = new Schema({
//   depart_coord: { lat: Number, lng: Number },
//   title: String,
//   description: String,
//   dest_coord: { lat: Number, lng: Number },
//   distance: Number,
//   distance_str: String,
//   date: { type: Date, default: Date.now },
//   depart_time: String,
//   departure: { type: String, required: true },
//   destination: { type: String, required: true },
//   driver_email: { type: String, required: true },
//   passengers: [
//     { email: String, departure: String, destination: String, status: String },
//   ],
//   passenger_capacity: Number,
//   price: Number,
//   duration: String,
//   seconds: Number,
//   status: String, // pending/done/cancelled/upcoming/full/
// });

// const Trip = mongoose.model('Trip', tripSchema);

// function createTrip(data) {
//   return Trip.create(data);
// }

// function deleteTrip(query) {
//   return Trip.deleteOne(query).exec(); // {deletedCount: 1}
// }

// function findTrip(query) {
//   console.log("db's query is", query);
//   return Trip.find(query).exec();
// }

// function updateTrip(query, data) {
//   return Trip.findOneAndUpdate(query, data);
// }

// const userSchema = new Schema({
//   user_photo: String,
//   email: String,
//   first_name: { type: String, required: true },
//   last_name: { type: String, required: true },
//   reviews: [{ stars: Number, review_text: String }],
//   bio: String,
//   current_trip: Schema.Types.ObjectId,
//   past_trips: [Schema.Types.ObjectId],
//   future_trips: [Schema.Types.ObjectId],
// });

// const User = mongoose.model('User', userSchema);

// function findOneAndUpdateUser(query, data) {
//   return User.findOneAndUpdate(query, data).exec();
// }

// function createUser(data) {
//   return User.create(data);
// }

// function deleteUser(query) {
//   return User.deleteOne({ email: query }).exec(); // {deletedCount: 1}
// }

// function getProfileData(query) {
//   console.log('query is', query);
//   return User.findOne(query).exec();
// }

// module.exports = {
//   createTrip,
//   deleteTrip,
//   findTrip,
//   updateTrip,
//   createUser,
//   findOneAndUpdateUser,
//   getProfileData,
//   deleteUser,
// };
