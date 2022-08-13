const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = 3000;

// trips
app.get('/trips', (req, res) => {
  res.send('trips data');
});

app.post('/trips', (req, res) => {
  res.send('trips post data');
});
app.put('/trips', (req, res) => {
  res.send('trips update data');
});

// user
app.get('/user', (req, res) => {
  res.send('user data');
});

app.get('*', (req, res) => {
  res.status(404).send('Page does not exist...');
});

// chat??
app.listen(PORT);
console.log('Server listening at http://localhost:3000');
