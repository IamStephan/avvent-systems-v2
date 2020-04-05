module.exports = async function({ user_id, email, username }) {
  let count

  if(user_id) {
    let checked_id = user_id

    if(typeof user_id === 'string') {
      checked_id = this.adapter.stringToObjectID(user_id)
    }

    count = await this.adapter.count({
      query: {
        _id: checked_id
      }
    })
  } else if(email) {
    count = await this.adapter.count({
      query: {
        email
      }
    })
  } else if(username) {
    count = await this.adapter.count({
      query: {
        username
      }
    })
  } else {
    count = 0
  }

  return count > 0
}