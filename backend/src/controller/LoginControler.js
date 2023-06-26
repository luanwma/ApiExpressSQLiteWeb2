const User = require('../models/User')
const sequelize = require('../config/database')

const jwt = require('jsonwebtoken')


exports.login = async (req, res) =>{
    console.log('login')
    const email = req.body.email
    const password = req.body.password

    try{
        const user = await User.findOne({where : {email}})
        if(user && user.password === password){
            //create token
            let payload = {}

            const token = jwt.sign({id : user.userid} , process.env.JWT_PRIVATE_KEY, {expiresIn:'1h'})
            console.log("token jwt -> "+token)
            return res.json({token : token})
        }
    }catch(error){
        return res.status(500).json({error : error})
    }
}