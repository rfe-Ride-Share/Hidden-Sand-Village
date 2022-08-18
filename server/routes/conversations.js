const router = require('express').Router();
const Conversation = require('../models/Conversation');

// Create conversation
router.post('/', async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.sender, req.body.receiver],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read conversation
//{ $in: [req.params.userId] }
router.get('/:userId', async (req, res) => {
  console.log(req.params.userId);
  try {
    const conversation = await Conversation.find({
      members: { $elemMatch: { _id: req.params.userId } },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
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
