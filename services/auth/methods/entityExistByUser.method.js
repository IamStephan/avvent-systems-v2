module.exports = async function(user_id) {
  const entityCount = await this.adapter.count({
    query: {
      user_id
    }
  })

  return entityCount > 0
}