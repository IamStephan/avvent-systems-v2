const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility:'public',
  params: {
    app_name:{
      type: 'string'
    },
    version: [
      { type: 'string' },
      { type: 'number' }
    ],
    roles:{
      type: 'array',
      items: 'string',
      optional: true
    },
    packages:{
      type: 'array',
      items: 'string',
      min: 1
    }

  },
  async handler(ctx){
    const { app_name, version, roles, packages } = ctx.params

    const appExists = await this.appExists({ app_name, version })

    if(appExists){
      throw new MoleculerError('App already exists', 409)
    }

    let appDefinition ={
      app_name,
      version,
      packages
    }

    if(roles){
      appDefinition.roles = roles
    }

    const createdAppDefinition = await this.createApp({ ...appDefinition })
    return createdAppDefinition
  }
}