module.exports = async function(auth_id, { refresh_token }) {
  let checked_auth_id = auth_id

  if(typeof auth_id === 'object') {
    checked_auth_id = this.adapter.objectIDToString(auth_id)
  }

  const refresh_token_added = await this.adapter.updateById(checked_auth_id, {
    $addToSet: {
      refresh_tokens: refresh_token
    }
  })

  return refresh_token_added
}