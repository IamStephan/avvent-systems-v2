module.exports = async function(user_id) {
  const entity = await this.adapter.insert({
    user_id,
    refresh_tokens: []
  })

  return entity
}