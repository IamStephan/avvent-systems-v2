module.exports = {

  visibility: 'public',
  params:{
    app_name:{
      type: 'string'
    },
    version:[
      { type:'string' },
      { type:'number' }
    ]
  },
  async handler(ctx){
    const {app_name, version} = ctx.params
    const exists = await this.appExists({ app_name, version })

    return exists
  }

}