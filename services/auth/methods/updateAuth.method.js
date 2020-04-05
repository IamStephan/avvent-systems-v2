module.exports = async function( auth_id, { reset_password_id }) {
  let updates = {}

  if(reset_password_id || reset_password_id === '') {
    updates.reset_password_id = reset_password_id
  }

  let checked_auth_id = auth_id

  if(typeof checked_auth_id === 'object') {
    checked_auth_id = this.adapter.objectIDToString(auth_id)
  }

  let auth = await this.adapter.updateById(checked_auth_id, {
    $set: {
      ...updates
    }
  })

  return auth
}