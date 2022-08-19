const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/users');
const tripRoute = require('./routes/trips');
const mongoose = require('mongoose');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('connected to MongoDB...'))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());

// socket io config
// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     orogin: 'http://localhost:3000',
//     method: ['GET', 'POST'],
//   },
// });
const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when ceonnect
  console.log('a user connected.');
  io.emit('welcome', 'hellow this is ');

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user !== undefined) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      });
    }
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

// io.on('connection', (socket) => {
//   console.log('user connected', socket.id);
//   socket.on('send_message', (data) => {
//     console.log('socket', data, 'socket_id:', socket.id);
//     //server
//     socket.emit('receive_message', data);
//   });
// });

// httpServer.listen(3001, () => {
//   console.log('Socket IO server connected...');
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;

app.use('/userr', userRoute);
app.use('/tripp', tripRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messageRoute);

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// chat??
app.listen(PORT);
console.log('Server listening at http://localhost:3000');
