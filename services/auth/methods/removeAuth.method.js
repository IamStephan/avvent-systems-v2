module.exports = async function({ auth_id }) {
  let checked_auth_id = auth_id

  if(typeof auth_id === 'object') {
    checked_auth_id = this.adapter.ObjectIDToString(auth_id)
  }

  let removed_auth = await this.adapter.removeById(checked_auth_id)

  return removed_auth
}