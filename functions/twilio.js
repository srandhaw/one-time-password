const twilio = require('twilio')

const accountSid = 'AC1f1b5cd7432fb083b7144f842c93a469'
const authToken = '84518280d10cfa57788cc5ed6b5eca76'

module.exports = new twilio.Twilio(accountSid,authToken)