module.exports = async function(id) {
  await this.adapter.removeById(id)
}