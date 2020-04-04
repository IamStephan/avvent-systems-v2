const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

  params: {
    access_token: {
      type: 'string'
    },
    verify_id: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { access_token, verify_id } = ctx.params

    const decoded_token = await ctx.call('v1.auth.authorize', {
      access_token
    })

    let user_id = decoded_token.id

    const user = await this.getUser({ user_id })

    if(!user) {
      throw new MoleculerError('user does not exist', 404)
    }

    if(user.verify_id !== verify_id) {
      throw new MoleculerError('Could not updateUser', 409)
    }

    let verified = true

    await this.updateUser(user_id, { verified })
  }
}