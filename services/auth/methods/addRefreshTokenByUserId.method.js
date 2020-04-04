module.exports = async function(refresh_token, user_id) {
  const authEntity = await this.getAuthEntityByUserId(user_id)

  const entity = await this.addRefreshTokenById(authEntity._id, refresh_token)

  return entity
}