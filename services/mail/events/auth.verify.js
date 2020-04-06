module.exports = {
  params: {
    email: {
      type: 'email',
      normalize: true
    },
    name: {
      type: 'string'
    },
    verify_id: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { email, name, verify_id } = ctx.params

    this.actions.send({
      to: email,
      template: 'verify',
      data: {
        name,
        verify_id
      }
    })
  }
}