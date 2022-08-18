const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/users');
const tripRoute = require('./routes/trips');
const mongoose = require('mongoose');
require('dotenv').config();

// const db = require('./db');

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('connected to MongoDB...'))
  .catch((err) => console.log(err));

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
  socket.on('send_message', (data) => {
    console.log('socket', data, 'socket_id:', socket.id);
    //server
    socket.emit('receive_message', data);
  });
});

httpServer.listen(3001, () => {
  console.log('Socket IO server connected...');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;

app.use('/userr', userRoute);
app.use('/tripp', tripRoute);


// trips
// app.get('/tripp', (req, res) => {
//   let query;
//   if (!req.query) {
//     query = {};
//   } else {
//     query = req.query;
//   }
//   db.findTrip(query)
//     .then((trip) => res.send(trip))
//     .catch((err) => res.status(400).send(err));
// });

// app.post('/tripp', (req, res) => {
//   db.createTrip(req.body)
//     .then((data) => res.status(201).send(data))
//     .catch((err) => res.status(500).send(err));
// });

// app.put('/tripp', (req, res) => {
//   db.updateTrip(req.query, req.body)
//     .then((data) => res.status(201).send(data))
//     .catch((err) => res.status(400).send(err));
// });

// app.delete('/tripp', (req, res) => {
//   db.deleteTrip(req.query)
//     .then((data) => {
//       data.deletedCount === 1
//         ? res.status(200).send(data)
//         : res.status(400).send(data);
//     })
//     .catch((err) => res.status(500).send());
// });

// // user
// app.get('/userr/', (req, res) => {
//   console.log('get user', req.query);
//   db.getProfileData(req.query)
//     .then((response) => {
//       console.log('response is', response);
//       if (!response) {
//         res.status(400).send('User not found ❌');
//       } else {
//         res.send(response);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// app.post('/userr', (req, res) => {
//   console.log('creating user', req.body);
//   db.createUser(req.body)
//     .then(() => res.status(201).send('User created ✅'))
//     .catch((err) => res.status(500).send('Could not create or update user ❌'));
// });

// // /userr?email=youremail
// app.put('/userr', (req, res) => {
//   db.findOneAndUpdateUser(req.query, req.body)
//     .then(() => res.status(201).send('User updated ✅'))
//     .catch((err) => res.status(500).send('Could not create or update user ❌'));
// });

// app.delete('/userr', (req, res) => {
//   db.deleteUser(req.query)
//     .then((data) => {
//       data.deletedCount === 1
//         ? res.status(200).send(data)
//         : res.status(400).send(data);
//     })
//     .catch((err) => console.error(err));
// });

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// chat??
app.listen(PORT);
console.log('Server listening at http://localhost:3000');
