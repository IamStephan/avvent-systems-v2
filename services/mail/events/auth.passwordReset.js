module.exports = {
  params: {
    email: {
      type: 'email',
      normalize: true
    },
    name: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { email, name } = ctx.params

    this.actions.send({
      to: email,
      template: 'passwordChanged',
      data: {
        name
      }
    })
  }
}
    