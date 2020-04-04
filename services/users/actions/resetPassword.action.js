module.exports = {
  visibility: 'public',

  params: {
    new_password: {
      type: 'string',
      pattern: /^\$2[ayb]\$.{56}$/gm
    },
    user_id: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { user_id, new_password } = ctx.params

    let password = new_password
    
    await this.updateUser(user_id, { password })
  }
}