var User = require('../schema')

const listFriends = async (req, res) => {
  const userId = req.userId
  User.findById(userId).populate('friends', ['email']).exec((err, user) => {
    if (err) {
      res.status(500).send({message: 'Error retreiving user'})
    }

    res.send(user.friends)
  })
}

const addFriend = async (req, res) => {
  const userId = req.userId
  const friendId = req.body.friendId
  User.update({_id: friendId, friends: {$nin: [userId]}, friendRequests: {$nin: [userId]}},
    {$push: {friendRequests: userId}}).exec((err, result) => {
    if (err || !result) {
      res.status(500).send({ success: false, message: 'Couldn\'t add friend.' })
      return
    }
    res.send({ success: true })
  })
}

const deleteFriend = async (req, res) => {
  const userId = req.userId
  const friendId = req.friendId

  User.update({_id: userId}, {$pull: {friendRequests: friendId}})
    .update({_id: friendId}, {$pull: {friendRequests: userId}}).exec((err, result) => {
      if (err || !result) {
        res.status(500).send({ success: false, message: 'Couldn\'t delete friend.' })
      }
      res.send({ success: true })
    })
}

const listFriendRequests = async (req, res) => {
  const userId = req.userId
  User.findById(userId).populate('friendRequests', 'email').exec((err, user) => {
    if (err) {
      res.status(500).send({message: 'Error retreiving user'})
    }

    res.send(user.friendRequests)
  })
}

const acceptFriendRequest = async (req, res) => {
  const userId = req.userId
  const friendId = req.friendId

  User.update({_id: userId, friendRequests: friendId}, {$pull: {friendRequests: friendId}})
    .update({_id: userId}, {$push: {friends: friendId}})
    .update({_id: friendId}, {$push: {friends: userId}}).exec((err, result) => {
      if (err || !result) {
        res.status(500).send({ success: false, message: 'Couldn\'t accept friend request.' })
      }
      res.send({ success: true })
    })
}

const deleteFriendRequest = async (req, res) => {
  const userId = req.userId
  const friendId = req.friendId

  User.update({_id: userId}, {$pull: {friendRequests: friendId}}).exec((err, result) => {
    if (err || !result) {
      res.status(500).send({ success: false, message: 'Couldn\'t delete friend request.' })
    }
    res.send({ success: true })
  })
}

const friendsGifts = async (req, res) => {
  const userId = req.userId
  const friendId = req.friendId
  User.findOne({_id: friendId, friends: userId}).populate('gifts.contributors.contributor', ['email']).exec((err, user) => {
    if (err) {
      res.status(500).send({message: 'Error retreiving user'})
    }

    res.send(user.gifts)
  })
}

module.exports = {
  listFriends,
  addFriend,
  deleteFriend,
  listFriendRequests,
  acceptFriendRequest,
  deleteFriendRequest,
  friendsGifts
}
