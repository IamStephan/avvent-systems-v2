const shortid = require('shortid')

module.exports = async function({ first_name, last_name, username, email, password }) {  
  let user = {
    first_name,
    last_name,
    username,
    email,
    password,
    started: new Date(Date.now()),
    verified: false,
    verify_id: shortid.generate()
  }

  let created_user = await this.adapter.insert(user)

  return created_user
}