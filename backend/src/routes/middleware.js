const jwt = require('jsonwebtoken')


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
                    req.userid = userid; // Adicione o userid ao objeto req para ser acessado posteriormente
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