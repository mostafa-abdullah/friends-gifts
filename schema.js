var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  gifts: {
    type: [{
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      contributors: {
        type: [{
          contributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          amount: {
            type: Number,
            required: true
          }
        }],
        required: true,
        default: []
      }
    }],
    required: true,
    default: []
  },

  friends: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    required: true,
    default: []
  },

  friendRequests: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    required: true,
    default: []
  }
})

// authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        err = new Error('User not found.')
        err.status = 401
        return callback(err)
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return callback(err)
        }
        if (result === true) {
          return callback(null, user)
        } else {
          return callback()
        }
      })
    })
}

// hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

var User = mongoose.model('User', userSchema)
module.exports = User
