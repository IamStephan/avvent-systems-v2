module.exports = async function({auth_id, user_id, refresh_token}) {
  let query_id = {}

  if(auth_id) {
    let checked_auth_id = auth_id

    if(typeof auth_id === 'string') {
      checked_auth_id = this.adapter.stringToObjectID(auth_id)
    }

    query_id.auth_id = checked_auth_id
    
  } else if(user_id) {
    let checked_user_id = user_id

    if(typeof user_id === 'string') {
      checked_user_id = this.adapter.stringToObjectID(user_id)
    }

    query_id.user_id = checked_user_id

  } else {
    return true
  }


  const refresh_tokensExists = await this.adapter.count({
    query: {
      ...query_id,
      refresh_tokens: { $in: [refresh_token] }
    }
  })

  return refresh_tokensExists > 0
}