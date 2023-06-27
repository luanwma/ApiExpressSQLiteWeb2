const jwt = require('jsonwebtoken')
const User = require('../models/User')

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
                    let user =  User.getById(decoded.id)
                    
                    req.userid = userid; // Adicione o userid ao objeto req para ser acessado posteriormente
                    //next()
                    return res.json({auth:true, user : user.nome})
                    
                }else{
                    return res.status(403).json({mensagem : 'Token falhou'})
                }
            } )
        }catch(error){
            return res.status(403).json({mensagem : 'Token errado'})
        }
    }

}