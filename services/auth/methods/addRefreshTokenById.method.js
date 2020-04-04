module.exports = async function(entity_id, refresh_token) {
  const entity = await this.adapter.updateById(entity_id, {
    $addToSet: {
      refresh_tokens: refresh_token
    }
  })

  return entity
}