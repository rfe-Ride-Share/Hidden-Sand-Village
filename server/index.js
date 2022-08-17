const express = require('express');
const path = require('path');

const db = require('./db');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;

// trips
app.get('/tripp/:id', (req, res) => {
  db.findTrip(req.params.id)
    .then((trip) => res.send(trip))
    .catch((err) => res.status(400).send(err));
});

app.post('/tripp', (req, res) => {
  db.createTrip(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(500).send(err));
});

app.put('/tripp/:id', (req, res) => {
  db.updateTrip(req.params.id, req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
});

app.delete('/tripp/:id', (req, res) => {
  db.deleteTrip(req.params.id)
    .then((data) => {
      data.deletedCount === 1
        ? res.status(200).send(data)
        : res.status(400).send(data);
    })
    .catch((err) => res.status(500).send());
});

// user
app.get('/user/:id', (req, res) => {
  db.getProfileData(req.params.id)
    .then((response) => res.send(response))
    .catch(() => res.send('User not found ❌'));
});

app.post('/user/', (req, res) => {
  db.createUser(req.body)
    .then(() => res.status(201).send('User created ✅'))
    .catch((err) => res.status(500).send('Could not create or update user ❌'));
});

app.put('/user/:id', (req, res) => {
  db.findOneAndUpdateUser(req.params.id, req.body)
    .then(() => res.status(201).send('User updated ✅'))
    .catch((err) => res.status(500).send('Could not create or update user ❌'));
});

app.delete('/user/:id', (req, res) => {
  db.deleteUser(req.params.id)
    .then((data) => {
      data.deletedCount === 1
        ? res.status(200).send(data)
        : res.status(400).send(data);
    })
    .catch((err) => console.error(err));
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// chat??
app.listen(PORT);
console.log('Server listening at http://localhost:3000');

const testUser = {
  user_id: 1000,
  user_photo: 'fakeUrl.picture',
  first_name: 'IAN',
  last_name: 'ZUBER',
  reviews: [
    { stars: 1, review_text: 'So wack' },
    { stars: 5, review_text: 'wonderful' },
  ],
  bio: 'Just a small town girl, livin in a lonely world',
};
// possibly change driver and passengers based on userid

const sampleTrip = {
  date: '1660576677204',
  depart_time: '1660576677205',
  departure: 'home',
  depart_coord: { lat: '123', lng: '321' },
  destination: 'home away from home',
  dest_coord: { lat: '123', lng: '321' },
  driver: 'Carl Poole', // driver email
  notes: 'Looking for an alien.',
  distance: 1,
  distance_str: 'one mile',
  passengers: [
    {
      Rider: { departure: 'place1', destination: 'place2', status: 'upcoming' },
    },
  ],
  passenger_capacity: 3,
  price: '2.38',
  duration: 'one hour',
  seconds: 123,
  status: 'upcoming', // pending/done/cancelled/upcoming/full/
};
