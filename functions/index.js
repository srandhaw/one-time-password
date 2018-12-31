const functions = require('firebase-functions');
const createUser = require('./create_user.js')

const admin  = require('firebase-admin')
const serviceAccount = require('./service_account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-d5eab.firebaseio.com"
});

exports.create_user = functions.https.onRequest(createUser)