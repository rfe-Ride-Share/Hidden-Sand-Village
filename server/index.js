const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const db = require('./db');

const app = express();
app.use(cors());

// socket io config
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    orogin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
});

httpServer.listen(3001, () => {
  console.log('Socket IO server connected...');
});

app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
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
app.get('/userr/', (req, res) => {
  console.log('get user', req.query);
  db.getProfileData(req.query)
    .then((response) => {
      console.log('response is', response);
      if (!response) {
        res.status(400).send('User not found ❌');
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.post('/userr', (req, res) => {
  console.log('creating user', req.body);
  db.createUser(req.body)
    .then(() => res.status(201).send('User created ✅'))
    .catch((err) => res.status(500).send('Could not create or update user ❌'));
});

app.put('/userr/:id', (req, res) => {
  db.findOneAndUpdateUser(req.params.id, req.body)
    .then(() => res.status(201).send('User updated ✅'))
    .catch((err) => res.status(500).send('Could not create or update user ❌'));
});

app.delete('/userr/:id', (req, res) => {
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
  email: 'ss@n.com',
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
  title: 'Alien hunting trip',
  description:
    'Aliens make too much environment issues and need to be restrained',
  date: '1660576677204',
  depart_time: '1660576677205',
  departure: 'home',
  depart_coord: { lat: '123', lng: '321' },
  destination: 'home away from home',
  dest_coord: { lat: '123', lng: '321' },
  driver: 'CarlPoole@mail.com', // driver email
  distance: 1,
  distance_str: 'one mile',
  passengers: [
    {
      Rider1: {
        departure: 'place1',
        destination: 'place2',
        status: 'upcoming',
        email: 'forThe@environment.com',
      },
    },
  ],
  passenger_capacity: 3,
  price: '2.38',
  duration: 'one hour',
  seconds: 123,
  status: 'upcoming', // pending/done/cancelled/upcoming/full/
};
