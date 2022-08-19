const Trip = require('../models/Trip');
const router = require('express').Router();

// Read trip

router.get('/', async (req, res) => {
  try {
    let query;
    if (!req.query) {
      query = {};
    } else {
      query = req.query;
    }
    console.log("db's query is", query);
    const trips = await Trip.find(query);
    console.log('trips are', trips);
    res.send(trips);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create trip
router.post('/', (req, res) => {
  Trip.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(500).send(err));
});

// Update trip
router.put('/', (req, res) => {
  return Trip.findOneAndUpdate(req.query, req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
});

// Delete trip
router.delete('/', (req, res) => {
  Trip.deleteOne(req.query)
    .exec() // {deletedCount: 1}
    .then((data) => {
      data.deletedCount === 1
        ? res.status(200).send(data)
        : res.status(400).send(data);
    })
    .catch((err) => res.status(500).send());
});

module.exports = router;
