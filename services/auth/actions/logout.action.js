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

    const decoded_user_id = this.verifyToken({ type: 'refresh', refresh_token })

    const user_id = decoded_user_id.id
    const authEntity = await this.getAuth({ user_id })

    if(universal === true) {
      await this.removeAllRefreshTokens(authEntity._id)
    } else {
      await this.removeRefreshToken(authEntity._id, refresh_token)
    }
  }
}