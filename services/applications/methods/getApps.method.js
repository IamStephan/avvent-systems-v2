module.exports = async function({ app_name, version }){

  let query_builder = {}

  if(app_name){
    query_builder.app_name = app_name
  }

  if(version){
    query_builder.version = version
  }

  const appDefinitions = await this.adapter.find({ 
    query:{
      ...query_builder
    }
  })
  return appDefinitions
}