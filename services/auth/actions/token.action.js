const { ObjectId } = require('mongodb')
const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

  params: {
    refresh_token: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { refresh_token } = ctx.params
    const decoded_refresh = this.verifyToken({ type: 'refresh', refresh_token })
    const user_id = decoded_refresh.id
    const user = await ctx.call('v1.users.getUser', { user_id })

    const refresh_tokenExists = await this.refreshTokenExists({user_id , refresh_token})

    if(!refresh_tokenExists) {
      throw new MoleculerError('Not Authorized', 401)
    }

    let access_token = this.generateToken({ type: 'access', user_id: user._id, verified: user.verified })

    return {
      access_token
    }
  }
}