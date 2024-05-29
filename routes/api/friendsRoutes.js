const router = require('express').Router();
const {
  addFriend,
  removeFriend,
} = require('../../controllers/friendController.js');

// Add a friend
// /api/users/:userId/friends
router.route('/:userId/friend/:friendsId').post(addFriend);

// Remove a friend
// /api/users/:userId/friends/:friendId
router.route('/:userId/friend/:friendsId').delete(removeFriend);

module.exports = router;