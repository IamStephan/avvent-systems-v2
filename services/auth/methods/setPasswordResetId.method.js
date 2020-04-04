module.exports = async function(auth_id, reset_password_id) {
  const updated_user = await this.adapter.updateById(auth_id, {
    $set: {
      reset_password_id
    }
  })

  return updated_user
}