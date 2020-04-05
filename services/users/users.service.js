'use strict'
const DbService = require('moleculer-db')
const MongoDBAdapter = require('moleculer-db-adapter-mongo')

module.exports = {
  name: 'users',
  version: 'v1',

  mixins: [DbService],
  adapter: new MongoDBAdapter('mongodb+srv://stephan_test:12344321@cluster0-v1ld8.mongodb.net/avvent_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  collection: 'users',
  settings: {
    idField: '_id',
    fields: [
      '_id',
      'first_name',
      'last_name',
      'username',
      'email',
      'password',
      'started',
      'verified',
      'verify_id',
      'verified',
    ]
  },

  actions: {
    // Published
    verifyUser: { ...require('./actions/verifyUser.action') },
    getUser: { ...require('./actions/getUser.action') },
    // updateUser

    // Public
    userExists: { ...require('./actions/userExists.action') },
    createNewUser: { ...require('./actions/createNewUser.action') },
    getUserSensitive: { ...require('./actions/getUserSensitive.action') },
    removeUser: { ...require('./actions/removeUser.action') },
    resetPassword: { ...require('./actions/resetPassword.action') },
  },

  methods: {
    createUser: require('./methods/createUser.method'),
    getUser: require('./methods/getUser.method'),
    removeUser: require('./methods/removeUser.method'),
    updateUser: require('./methods/updateUser.method'),
    userExists: require('./methods/userExists.method'),
  },

  events: {

  }
}

