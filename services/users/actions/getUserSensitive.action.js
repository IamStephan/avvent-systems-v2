const { MoleculerError } = require('moleculer').Errors

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
    let user_sensitive

    if(email) {
      user_sensitive = await this.getUser({ email })
    } else if(username){
      user_sensitive = await this.getUser({ username })
    } else if (user_id) {
      user_sensitive = await this.getUser({ user_id })
    } else {
      return null
    }

    if(!user_sensitive) {
      return null
    }
    return user_sensitive
  }
}