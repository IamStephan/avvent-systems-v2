module.exports = {
  visibility: 'public',
  params:{
    app_id:[
      { type: 'string' },
      { type: 'object' }
    ]
  },
  async handler(ctx){
    const {app_id} = ctx.params
    const removedApp = await this.removeApp(app_id)
    return removedApp
  }

}