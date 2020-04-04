const jwt = require('jsonwebtoken')
const { MoleculerError } = require('moleculer').Errors

module.exports = function(access_token) {
  const privateKey = 'privateKey'

  const decoded_token = jwt.verify(access_token, privateKey)

  if(!decoded_token.id) {
    throw new MoleculerError('Does not contain an id', 406, 'Doe not contain an id')
  }

  return decoded_token
}