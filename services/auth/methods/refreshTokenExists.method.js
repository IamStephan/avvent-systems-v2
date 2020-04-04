module.exports = async function(user_id, refresh_token) {
  console.log(user_id, refresh_token)
  const refresh_tokensExists = await this.adapter.count({
    query: {
      user_id,
      refresh_tokens: { $in: [refresh_token] }
    }
  })

  return refresh_tokensExists > 0
}