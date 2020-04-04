module.exports = async function({ app_name, version, roles, packages }){
  let appDefinition = {
    app_name,
    version
  };
  if(roles){
    appDefinition.roles = roles
  };
  if(packages){
    appDefinition.packages = packages
  };

  const createdAppDefinition = await this.adapter.insert(appDefinition)
  return createdAppDefinition;
}