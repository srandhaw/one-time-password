const admin = require('firebase-admin')
const twilio = require('./twilio.js')

module.exports = function(req, res){
    if(!req.body.phone){
        return res.status(422).send({error: 'Must provide phone number'})
    }

    //const phone = String(req.body.phone).replace(/[^\d]/g, "")

    admin.auth().getUser(req.body.phone).then((userRecord)=>{

      const code = Math.floor(Math.random() * 8999 + 1000)

      twilio.messages.create({
     body: "Your code is "+ code,
     from: '+13134622844',
     to: req.body.phone
   }, (err)=>{
       if(err){
           return res.status(422).send({error: err})
       }

       admin.database().ref('users/'+req.body.phone).update({code: code, codeValid: true}, ()=>{
           res.send({success: true})
       })
   })


    }).catch((err)=>{
        res.status(422).send({error: err})
    })

}