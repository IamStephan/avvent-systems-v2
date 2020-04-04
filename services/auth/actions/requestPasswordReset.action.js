const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

  params: {
    email: {
      type: 'email',
      normalize: true
    }
  },
  
  async handler(ctx) {
    const { email } = ctx.params

    const user = await ctx.call('v1.users.getUser', { email })

    if(!user) {
      throw new MoleculerError('User not found', 404)
    }

    let auth_entity = await this.getAuthEntityByUserId(user._id)

    if(!auth_entity) {
      auth_entity = await this.createAuthEntity(user._id)
    }

    const password_reset_id = this.generatePasswordResetId()
    
    await this.setPasswordResetId(auth_entity._id.toString(), password_reset_id)
  }
}