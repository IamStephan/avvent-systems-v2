module.exports = {
  visibility: 'public',
  params: {
    app_name:{
      type: 'string',
      optional: true
    },
    version:[
      {
        type:'string',
        optional: true
      },
      {
        type: 'number',
        optional: true
      }
    ]
  },
  async handler(ctx){
    const {app_name, version} = ctx.params
    const appDefinitions = await this.getApps({ app_name, version })
    
    return appDefinitions
  }

}