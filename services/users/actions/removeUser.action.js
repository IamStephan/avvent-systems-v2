module.exports = {
  visibility: 'public',

  params: {
    user_id: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { user_id } = ctx.params

    await this.removeUser(user_id)
  }
}