const bcrypt = require('bcrypt')

module.exports = async function({ password, hashed }) {
  let comparison = await bcrypt.compare(password, hashed)

  return comparison
}