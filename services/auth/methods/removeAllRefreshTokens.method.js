module.exports = async function(authEntity_id) {
  await this.adapter.updateById(authEntity_id, {
    $set: {
      refresh_tokens: []
    }
  })
}