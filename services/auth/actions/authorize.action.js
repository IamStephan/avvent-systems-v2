module.exports = {
  visibility: 'public',

  params: {
    access_token: {
      type: 'string'
    }
  },

  handler(ctx) {
    const { access_token } = ctx.params

    return this.verifyToken({ type: 'access', access_token })
  }
}