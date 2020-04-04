module.exports = async function(authEntity_id, refresh_token) {
  await this.adapter.updateById(authEntity_id, {
    $pull: {
      refresh_tokens: refresh_token
    }
  })
}