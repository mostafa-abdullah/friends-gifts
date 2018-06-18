var User = require('../schema')

const add = async (req, res) => {
  const userId = req.userId
  const giftName = req.body.giftName
  const giftPrice = req.body.giftPrice

  User.update({_id: userId}, {$push: {gifts: {name: giftName, price: giftPrice}}}).exec((err, result) => {
    if (err || !result) {
      res.status(500).send({ success: false, message: 'Couldn\'t add gift.' })
      return
    }

    res.send({ success: true })
  })
}

const contribute = async (req, res) => {
  const userId = req.userId
  const friendId = req.body.friendId
  const giftName = req.body.giftName
  const amount = req.body.amount

  const contributor = {
    contributor: userId,
    amount: amount
  }
  User.update({_id: friendId, 'gifts.name': giftName}, {$push: {'gifts.$.contributors': contributor}}).exec((err, result) => {
    if (err || !result) {
      res.status(500).send({ success: false, message: 'Couldn\'t contribute to gift.' })
      return
    }

    res.send({ success: true })
  })
}

const list = async (req, res) => {
  const userId = req.userId
  User.findById(userId).populate('gifts.contributors.contributor', ['email']).exec((err, user) => {
    if (err || !res) {
      res.status(500).send({ success: false, message: 'Couldn\'t retreive gifts.' })
      return
    }

    res.send(user.gifts)
  })
}

module.exports = { add, contribute, list }
