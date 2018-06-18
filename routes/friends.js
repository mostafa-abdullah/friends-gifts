var express = require('express')
var router = express.Router()
var {
  listFriends,
  addFriend,
  deleteFriend,
  listFriendRequests,
  acceptFriendRequest,
  deleteFriendRequest,
  friendsGifts
} = require('../controllers/friends')

router.get('/listFriends', listFriends)
router.post('/addFriend', addFriend)
router.delete('/deleteFriend', deleteFriend)

router.get('/listFriendRequests', listFriendRequests)
router.put('/acceptFriendRequest', acceptFriendRequest)
router.delete('/deleteFriendRequest', deleteFriendRequest)

router.get('friendsGifts', friendsGifts)

module.exports = router
