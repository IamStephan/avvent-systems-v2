const { ObjectId } = require('mongodb')

module.exports = {
  visibility: 'published',

  params: {
    refresh_token: {
      type: 'string'
    },
    universal: {
      type: 'boolean',
      optional: true
    }
  },

  async handler(ctx) {
    const { refresh_token, universal } = ctx.params

    const user_id = this.verifyToken({ type: 'refresh', refresh_token })

    const authEntity = await this.getAuthEntityByUserId(ObjectId(user_id.id))

    if(universal === true) {
      await this.removeAllRefreshTokens(authEntity._id)
    } else {
      await this.removeRefreshToken(authEntity._id, refresh_token)
    }
  }
}