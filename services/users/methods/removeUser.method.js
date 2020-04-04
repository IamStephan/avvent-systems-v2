module.exports = async function(user_id) {
  await this.adapter.removeById(user_id)
}