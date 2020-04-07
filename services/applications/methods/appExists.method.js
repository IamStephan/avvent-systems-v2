module.exports = async function({ app_name, version }){
  const count = await this.adapter.count({ 
    query: {
      app_name,
      version
    }
  })

  return count > 0
}