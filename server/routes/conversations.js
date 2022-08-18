const router = require('express').Router();
const Conversation = require('../models/Conversation');

// Create conversation
router.post('/', (req, res) => {
  Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  })
    .then((convers) => res.send(convers))
    .catch((err) => res.status(500).send(err));
});

// Read conversation
router.get('/:userId', (req, res) => {
  Conversation.find({
    members: { $in: [req.params.userId] },
  })
    .then((convers) => res.send(convers))
    .catch((err) => res.status(500).send(err));
});

// get conversation includes two userId
router.get('/find/:firstUserId/:secondUserId', (req, res) => {
  Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  })
    .then((convers) => res.send(convers))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
