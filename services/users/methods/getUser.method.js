module.exports = async function({ user_id, email, username }) {
  let user

  if(user_id) {
    user = await this.adapter.findById(user_id)
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