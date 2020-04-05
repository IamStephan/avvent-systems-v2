module.exports = async function(user_id) {
  let checked_user_id = user_id

  if(typeof checked_user_id === 'object') {
    checked_user_id = this.adapter.objectIDToString(user_id)
  }

  await this.adapter.removeById(checked_user_id)
}