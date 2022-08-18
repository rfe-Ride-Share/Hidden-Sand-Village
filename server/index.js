const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/users');
const tripRoute = require('./routes/trips');
const mongoose = require('mongoose');
require('dotenv').config();

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

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// chat??
app.listen(PORT);
console.log('Server listening at http://localhost:3000');
