const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

  params: {
    first_name: {
      type: 'string',
      min: 1,
      max: 16
    },
    last_name: {
      type: 'string',
      min: 1,
      max: 16
    },
    email: {
      type: 'email',
      normalize: true
    },
    username: {
      type: 'string',
      lowercase: true,
      min: 1,
      max: 16
    },
    password: {
      type: 'custom',
      check(value) {
        let flaws = []

        if(typeof value !== 'string') {
          return [{ type: 'type', expected: 'string', actual: typeof value }]
        }

        if(/(\s)/g.test(value)) {
          return [{ type: 'validation', expected: 'Cannot contain any whitespace' }]
        }

        let tests = [
          {
            pattern: /^(.){8,}$/g,
            message: 'Password must be longer that 8 characters'
          },
          {
            pattern: /([A-Z])/g,
            message: 'At least one upper case English letter'
          },
          {
            pattern: /([a-z])/g,
            message: 'At least one lower case English letter'
          },
          {
            pattern: /([0-9])/g,
            message: 'At least one digit'
          },
          {
            pattern: /([#?!@$%^&*-])/g,
            message: 'At least one special character'
          }
        ]

        for(let i = 0; i < tests.length; i++) {
          if(!tests[i].pattern.test(value)) {
            flaws.push({ type: 'validation', expected: tests[i].message })
          }
        }

        return flaws.length === 0 ? true : flaws
      }
    }
  },

  async handler(ctx) {
    const { first_name, last_name, username, email, password } = ctx.params
    const password_h = await this.generatedHashedPassword(password)

    const created_user = await ctx.call('v1.users.createNewUser', {
      first_name,
      last_name,
      email,
      username,
      password: password_h
    })

    const authEntityExists = await this.entityExistByUser(created_user._id)

    if(authEntityExists) {
      throw new MoleculerError('Seems like user does exist', 409, 'Seems like user does exist')
    }

    const access_token = this.generateToken({ type: 'access', user_id: created_user._id, verified: created_user.verified })
    const refresh_token = this.generateToken({ type: 'refresh', user_id: created_user._id })

    const authEntity = await this.createAuthEntity(created_user._id)

    await this.addRefreshTokenById(authEntity._id, refresh_token)

    return {
      access_token,
      refresh_token
    }
  }
}