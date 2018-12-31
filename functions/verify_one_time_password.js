const admin = require('firebase-admin')


module.exports = function(req, res){

if(!req.body.phone || !req.body.code){
    return res.status(422).send({error: 'Must provide phone number and code'})
}

const phone = String(req.body.phone)
const code = parseInt(req.body.code)

admin.auth().getUser(phone).then(()=>{

admin.database().ref('users/'+phone).on('value',snapshot=>{
    admin.database().ref('users/'+phone).off()
    const user = snapshot.val()

    if(user.code!== code || !user.codeValid){
        return res.status(422).send({error: 'Code not valid'})
    }

    admin.database().ref('users/'+phone).update({codeValid: false})

    admin.auth().createCustomToken(phone).then(token => {
        res.send({
            token: token
        })
    })
})

}).catch((err)=>{
res.status(422).send({error: err})
})

}