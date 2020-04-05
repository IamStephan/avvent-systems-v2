module.exports = async function(app_id){
  let transformed_app_id = app_id

  if(typeof app_id === 'object') {
    transformed_app_id = this.adapter.objectIDToString(app_id)
  }

  const removedAppDefinition = await this.adapter.removeById(transformed_app_id)
  return removedAppDefinition
}