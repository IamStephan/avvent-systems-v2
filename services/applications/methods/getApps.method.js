module.exports = async function({ app_name, version }){

  let query = {}

  if(app_name){
    query.app_name = app_name
  }

  if(version){
    query.version = version
  }

  const appDefinitions = await this.adapter.find({ 
    ...query
  })
  return appDefinitions
}