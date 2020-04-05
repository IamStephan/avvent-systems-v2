module.exports = async function(auth_id, { refresh_token, universal }) {
  let updated_auth

  if(universal) {
    updated_auth = await this.adapter.updateById(auth_id, {
      $set: {
        refresh_tokens: []
      }
    })
  } else {
    updated_auth = await this.adapter.updateById(auth_id, {
      $pull: {
        refresh_tokens: refresh_token
      }
    })
  }

  return updated_auth
}