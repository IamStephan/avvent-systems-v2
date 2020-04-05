module.exports = async function({ user_id }) {
  let check_user_id = user_id

  if(typeof user_id === 'string') {
    check_user_id = this.adapter.stringToObjectID(user_id)
  }

  let base_auth = {
    user_id: check_user_id,
    refresh_tokens: [],
    reset_password_id: ''
  }

  let auth = await this.adapter.insert(base_auth)

  return auth
}