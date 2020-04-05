module.exports = async function({ auth_id, user_id }) {
  let auth

  if(auth_id) {
    let checked_auth_id = auth_id

    if(typeof checked_auth_id === 'object') {
      checked_auth_id = this.adapter.objectIDToString(auth_id)
    }

    auth = await this.adapter.findById(checked_auth_id)

  } else if(user_id) {
    let checked_user_id = user_id

    if(typeof checked_user_id === 'string') {
      checked_user_id = this.adapter.stringToObjectID(user_id)
    }

    auth = await this.adapter.findOne({
      user_id: checked_user_id
    })
  } else {
    auth = null
  }

  return auth
}