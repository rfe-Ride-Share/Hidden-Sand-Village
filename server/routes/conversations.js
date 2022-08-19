const router = require('express').Router();
const Conversation = require('../models/Conversation');

// Create conversation
router.post('/', async (req, res) => {
  Conversation.create({
    members: [req.body.senderId, req.body.receiverId],
  })
    .then((convers) => {
      res.status(200).send(convers);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Read conversation
router.get('/:userId', async (req, res) => {
  console.log(req.params.userId);
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get conversation including two userId
router.get('/find/:firstUserId/:secondUserId', (req, res) => {
  console.log('params are', req.params);
  Conversation.findOne({
    members: { $all: [req.params.firstUserId, req.params.secondUserId] },
  })
    .then((convers) => res.send(convers))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
