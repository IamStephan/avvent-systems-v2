const jwt = require('jsonwebtoken')

module.exports = function({ type, user_id, verified }) {
  let token
  let accessPrivateKey = 'privateKey'
  let refreshPrivateKey ='privateKeyRefresh'

  switch(type) {
    case 'access':
      token = jwt.sign({
        id: user_id,
        verified: verified
      }, accessPrivateKey, {
        expiresIn: '6 hours'
      })
      break

    case 'refresh':
      token =  jwt.sign({
        id: user_id
      }, refreshPrivateKey)
      break

    default:
      token = null
  }

  return token
}