module.exports = async function({ auth_id, user_id }) {
  let count

  if(auth_id) {
    let checked_auth_id = auth_id

    if(typeof auth_id === 'string') {
      checked_auth_id = this.adapter.stringToObjectID(auth_id)
    }

    count = await this.adapter.count({
      query: {
        _id: checked_auth_id
      }
    })
  } else if(user_id) {
    let checked_user_id = user_id

    if(typeof user_id === 'string') {
      checked_user_id = this.adapter.stringToObjectID(user_id)
    }

    count = await this.adapter.count({
      query: {
        user_id: checked_user_id
      }
    })
  } else {
    count = 0
  }

  return count > 0
}