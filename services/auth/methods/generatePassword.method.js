const bcrypt = require('bcrypt')
const shortid = require('shortid')

module.exports = async function({ type, password }) {
  let returnValue

  switch(type) {
    case 'hash':
      returnValue = await bcrypt.hash(password, 5)
      break

    case 'reset':
      returnValue = shortid.generate()
      break

    default:
      returnValue = null
  }

  return returnValue
}