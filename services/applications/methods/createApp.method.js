module.exports = async function({ app_name, version, roles, packages }){
  let appDefinition = {
    app_name,
    version,
    packages
  }

  if(roles){
    appDefinition.roles = roles
  }

  const createdAppDefinition = await this.adapter.insert(appDefinition)
  return createdAppDefinition;
}