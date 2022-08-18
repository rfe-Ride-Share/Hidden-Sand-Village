const router = require('express').Router();
const Message = require('../models/Message');

// Create message
router.post('/', (req, res) => {
  Message.create(req.body)
    .then((mes) => {
      res.status(200).json(mes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Read message
router.get('/:conversationId', (req, res) => {
  Message.find({
    conversationId: req.params.conversationId,
  })
    .then((mes) => {
      res.status(200).json(mes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
