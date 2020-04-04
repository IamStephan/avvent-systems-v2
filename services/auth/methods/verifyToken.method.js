const jwt = require('jsonwebtoken')

module.exports = function({ type, access_token, refresh_token }) {
  let decoded_token
  let accessPrivateKey = 'privateKey'
  let refreshPrivateKey ='privateKeyRefresh'

  switch(type){
    case 'access':
      decoded_token = jwt.verify(access_token, accessPrivateKey)
      break

    case 'refresh':
      decoded_token = jwt.verify(refresh_token, refreshPrivateKey)
      break

    default:
      decoded_token = null
  }

  return decoded_token
}