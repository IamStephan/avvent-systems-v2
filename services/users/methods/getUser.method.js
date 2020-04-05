module.exports = async function({ user_id, email, username }) {
  let user

  if(user_id) {
    let checked_user_id = user_id

    if(typeof checked_user_id === 'object') {
      checked_user_id = this.adapter.objectIDToString(user_id)
    }
    
    user = await this.adapter.findById(checked_user_id)
  } else if(email) {
    user = await this.adapter.findOne({
      email
    })
  } else if(username){
    user = await this.adapter.findOne({
      username
    })
  } else {
    user = null
  }

  return user
}