const jwt = require('jsonwebtoken')
const User = require('../models/User')
const sequelize = require('../config/database')


module.exports = {
    validarJwt : function(req, res, next){
        const token = req.headers.token
        
        //const token = req.headers.authorization
        const userid = req.headers.userid
        console.log("verificando userid -> "+userid)
        console.log("verificando token ->"+token)
        try{
            jwt.verify(token, process.env.JWT_PRIVATE_KEY , (erro, decoded) =>{
                if(!erro && decoded ){
                    console.log("Validação de Token OK")
                   // let user =  User.getById(decoded.id)
                    
                    req.userid = userid; // Adicione o userid ao objeto req para ser acessado posteriormente
                    
                    //res.json({auth: true,userid : userid})
                   next()
                }else{
                    return res.status(403).json({mensagem : 'Token falhou'})
                }
            } )
        }catch(error){
            return res.status(403).json({mensagem : 'Token errado'})
        }
    }

}
/*
    const validarUser = async (req, res, next) =>{
        const id = req.userid

       const user =  await User.findOne(id)
        if(!user){
            return res.status(400).send({mensagem: "Usuario nao encontrado"})
        }else{
            next()
        }
        
        


    }
module.exports = {validarUser}
*/



