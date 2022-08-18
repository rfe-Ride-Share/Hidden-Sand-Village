const User = require('../models/User');
const router = require('express').Router();

// Create user
router.post('/', (req, res) => {
  console.log('creating user', req.body);
  User.create(req.body)
    .then(() => res.status(201).send('User created ✅'))
    .catch((err) => res.status(500).send('Could not create or update user ❌'));
});

// Read user
router.get('/', (req, res) => {
  console.log('query is', req.query);
  User.findOne(req.query)
    .exec()
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

// Update user
// /userr?email=youremail
router.put('/', (req, res) => {
  User.findOneAndUpdate(req.query, req.body)
    .exec()
    .then(() => res.status(201).send('User updated ✅'))
    .catch((err) => res.status(500).send('Could not create or update user ❌'));
});

// Delete user
router.delete('/', (req, res) => {
  User.deleteOne({ email: req.query })
    .exec() // {deletedCount: 1}
    .then((data) => {
      data.deletedCount === 1
        ? res.status(200).send(data)
        : res.status(400).send(data);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
