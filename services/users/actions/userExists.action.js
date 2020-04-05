module.exports = {
  visibility: 'public',

  params: {
    email: {
      type: 'email',
      normalize: true,
      optional: true
    },
    username: {
      type: 'string',
      optional: true
    },
    user_id: {
      type: 'string',
      optional: true
    }
  },

  async handler(ctx) {
    const { email, username, user_id } = ctx.params
    let userExists

    if(email) {
      userExists = await this.userExists({ email })
    } else if(username){
      userExists = await this.userExists({ username })
    } else if (user_id) {
      userExists = await this.userExists({ user_id })
    } else {
      throw new MoleculerError('Missing parameters', 404)
    }

    return userExists
  }
}