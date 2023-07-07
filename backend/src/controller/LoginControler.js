const User = require('../models/User')
const sequelize = require('../config/database')

const jwt = require('jsonwebtoken')


exports.login = async (req, res, next) =>{
    console.log('login')
  
    const email = req.body.email
    const password = req.body.password
    console.log("email -> "+email)
    console.log("pass -> "+password)

    try{
        const user = await User.findOne({where : {email:email}})
        if(user && user.password === password){
            //create token
            let payload = {}
            console.log(user)
            console.log("quantidade de logins "+user.loginCount)

            const token = jwt.sign({id : user.userid} , process.env.JWT_PRIVATE_KEY, {expiresIn:'1h'})
            console.log("token jwt -> "+token)
            
            
            res.status(200).json({token:token, userid : user.userid})
            user.increment('loginCount')
            next()
           // return res.redirect('/cadastro_receita')
        }else{
            console.log('Usuario nao existe')
            return res.status(404).json({mensagem : "usuario nao existe"})
        }
    }catch(error){
        return res.status(500).json({error : error})
    }
}