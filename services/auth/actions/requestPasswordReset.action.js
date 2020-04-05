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

    let user_id = user._id

    let auth_entity = await this.getAuth({ user_id })

    if(!auth_entity) {
      auth_entity = await this.createAuthEntity(user._id)
    }

    const reset_password_id = await this.generatePassword({ type: 'reset' })
    
    await this.updateAuth(auth_entity._id, { reset_password_id })
  }
}