const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'public',

  params: {
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    username: {
      type: 'string',
      lowercase: true
    },
    email: {
      type: 'email',
      normailize: true
    },
    // hashed already
    password: {
      type: 'string',
      pattern: /^\$2[ayb]\$.{56}$/gm
    }
  },

  async handler(ctx) {
    const { first_name, last_name, email, username, password } = ctx.params

    if(await this.userExists({ email }) || await this.userExists({ username })) {
      throw new MoleculerError('User already Exists', 409, 'User already Exists')
    }

    const created_user = await this.createUser({ first_name, last_name, email, username, password })

    return created_user
  }
}