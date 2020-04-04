const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

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
    let user

    if(email) {
      user_sensitive = await this.getUser({ email })
    } else if(username){
      user_sensitive = await this.getUser({ username })
    } else if (user_id) {
      user_sensitive = await this.getUser({ user_id })
    } else {
      throw new MoleculerError('Missing parameters', 404)
    }

    if(!user_sensitive) {
      throw new MoleculerError('User does not exist', 404)
    }

    user = {
      _id: user_sensitive._id,
      first_name: user_sensitive.first_name,
      last_name: user_sensitive.last_name,
      username: user_sensitive.username,
      email: user_sensitive.email
    }

    return user
  }
}