const bcrypt = require('bcrypt')

module.exports = async function(password) {
  const hashes = 5
  const password_h = await bcrypt.hash(password, hashes)

  return password_h
}