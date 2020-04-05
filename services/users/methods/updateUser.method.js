module.exports = async function( user_id, { first_name, last_name, email, verified, password }) {
  let updates = {}

  if(first_name) {
    updates.first_name = first_name
  }

  if(last_name) {
    updates.last_name = last_name
  }

  if(email) {
    updates.email = email
  }

  if(verified) {
    updates.verified = verified
  }

  if(password) {
    updates.password = password
  }

  let checked_user_id = user_id

  if(typeof checked_user_id === 'object') {
    checked_user_id = this.adapter.objectIDToString(user_id)
  }

  let user = await this.adapter.updateById(checked_user_id, {
    $set: {
      ...updates
    }
  })

  return user
}