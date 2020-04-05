'use strict'
const DbService = require('moleculer-db')
const MongoDBAdapter = require('moleculer-db-adapter-mongo')

module.exports = {
  name: 'applications',
  version: 'v1',
  mixins: [DbService],
  adapter:new MongoDBAdapter('mongodb+srv://stephan_test:12344321@cluster0-v1ld8.mongodb.net/avvent_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  collection: 'applications',
  settings: {
    idField: '_id',
    fields: [
      '_id','app_name','version','roles','packages'
    ]
  },
  actions:{
    //published 'users'
    //public 'admin'

    addAppDefinition: {...require('./actions/addAppDefinition.action')},
    //removeAppDefinition
    getAppDefinitions: {...require('./actions/getAppDefinitions.action')},
    appExists: {...require('./actions/appExists.action')}

  },
  methods:{
    createApp: require('./methods/createApp.method'),
    appExists: require('./methods/appExists.method'),
    //updateApp
    //removeApp
    getApps: require('./methods/getApps.method')

  }
};


