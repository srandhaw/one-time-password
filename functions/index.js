const functions = require('firebase-functions');
const createUser = require('./create_user.js')
const requestOneTimePassword = require('./request_one_time_password.js')
const verifyOneTimePassword = require('./verify_one_time_password.js')

const admin  = require('firebase-admin')
const serviceAccount = require('./service_account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-d5eab.firebaseio.com"
});

exports.create_user = functions.https.onRequest(createUser)
exports.request_one_time_password = functions.https.onRequest(requestOneTimePassword)
exports.verify_one_time_password = functions.https.onRequest(verifyOneTimePassword)