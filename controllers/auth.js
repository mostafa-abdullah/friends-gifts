var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

const User = require('../schema')

const register = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email) {
    res.status(400).send({ success: false, message: 'Email is missing' })
    return
  }
  if (!password) {
    res.status(400).send({ success: false, message: 'Password is missing' })
    return
  }

  const user = new User({email, password})
  await user.save()

  res.send({ success: true })
}

const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({email: email})
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Login error occured.' })
        return
      }
      if (!user) {
        res.status(401).send({ success: false, message: 'Invalid email.' })
        return
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ success: false, message: 'Error occured in verifying password.' })
          return
        }
        if (!result) {
          res.status(401).send({ success: false, message: 'Invalid password.' })
          return
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        })

        res.status(200).send({ success: true, token: token })
      })
    })
}

const logout = async (req, res) => {
  // do nothing
  res.send({ success: true })
}

module.exports = {
  register,
  login,
  logout
}
