module.exports = async function(user_id) {
  const authEntity = await this.adapter.findOne({
    user_id
  })

  return authEntity
}