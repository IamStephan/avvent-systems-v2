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

    const updated_auth = await this.removeRefreshToken(authEntity._id, { refresh_token, universal })

    return updated_auth
  }
}