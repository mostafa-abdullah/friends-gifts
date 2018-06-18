var jwt = require('jsonwebtoken')

const needsLogin = (req, res, next) => {
  var token = req.headers['Authorization'] || req.headers['authorization']
  if (!token) return res.status(401).send({ message: 'No token provided.' })
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded || !decoded.userId) return res.status(403).send({ success: false, message: 'Failed to authenticate token.' })
    req.userId = decoded.userId
    next()
  })
}

module.exports = needsLogin
