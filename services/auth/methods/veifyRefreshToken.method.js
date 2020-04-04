const jwt = require('jsonwebtoken')
const { MoleculerError } = require('moleculer').Errors

module.exports = function(refresh_token) {
  const privateKey = 'privateKeyForRefresh'

  const decoded_token = jwt.verify(refresh_token, privateKey)

  if(!decoded_token.id) {
    throw new MoleculerError('Does not contain an id', 406, 'Doe not contain an id')
  }

  return decoded_token
}