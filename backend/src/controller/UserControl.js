const User = require('../models/User')
const sequelize = require('../config/database')

const jwt = require('jsonwebtoken');

require('dotenv').config()

exports.createUser = async (req, res) =>{
    
    const nome = req.body.nome
    const email = req.body.email
    const password = req.body.password
    const dataNascimento = req.body.birthdate

    console.log("nome "+nome)
    console.log("email "+email)
    console.log("senha "+password)
    console.log("dataNascimento "+dataNascimento)
    

    try{
        const novoUser = await User.create({nome, email, password, dataNascimento})
        
        return res.json(novoUser)
    }catch(error){
        console.log(error)
        res.status(500).json({error:'Erro ao criar usuario.'})
    }
}

exports.getUserById = async (req, res) =>{
    const {id} = req.params
    try{
        const user = await User.findByPk(id);
        if(user){
            res.json(user)
        }else{
            res.status(404).json({error: 'Usuario nao encontrado'})
        }

    } catch(error){ 
        console.log(error)
        res.status(500).json({error:"Erro interno"}).json({error:'Erro ao encontrar usuario '})
    
    }
}

exports.updateUser = async (req, res) =>{
    const {id} = req.params
    const {nome, email, password, dataNascimento} = req.body
    try{
        const user = await User.findByPk(id)
        if(user){
            user.nome = nome
            user.email = email
            user.password = password
            user.dataNascimento = dataNascimento
            await user.save()
            return res.json(user)
             
            

        } else {
            res.status(404).json({error: 'Usuario nao existe'})
            throw new Error('Usuário não existe')
            
        }
    } catch(error){
        
        console.log(error)
        res.status(500).json({error :'Erro ao encontrar usuario'})
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: 'Usuario excluido com sucesso' });
      } else {
        res.status(404).json({ error: 'Usuario nao encontrado.' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao excluir o usuario.' });
    }
  };

  /*
  exports.validaUser = async (req, res, next) =>{
    
    const email = req.body.email
    const password  = req.body.password
    try{
        const user =  await User.findOne({where:{email}})
        console.log(user)
       if(user && user.password === password){ 
            const payload = {userName : user.nome, email : user.email }
            console.log("user name "+user.nome)
            const token = jwt.sign({id:user.userid} , process.env.PRIVATE_KEY_JWT, {expiresIn: '1h'} )
            //res.json({token})
           // res.redirect('minhas_receitas?token=${token}')
            res.json({token:token})
            
            
       }else{
        if(!user){
            res.status(401).json({error : 'Usuario nao encontrado'})
        }
        if(user.password !== password){
            res.status(401).json({error : 'Senhas nao conferem'})
        }
        
       }
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Erro ao fazer login'})
    }
  }
  */

  exports.listarUsuarios = async (req, res) =>{
    try{

      
        const users = await User.findAll({attributes : {exclude :['password']}})
        console.log(users)

        const listaUsers =  users.map(user => ({
           userid : user.userid,
           name: user.name, 
           email : user.email,
           dataNascimento: user.dataNascimento

        }))
       
        /*for(let i = 0 ; i < usuarios.length ; i++){
            usuarios[i] = {
                nome : users[i].nome, 
                email : users[i].email, 
                id : users[i].userId,
            }
        } */
        return res.status(200).json(listaUsers)
    }catch(error){
        console.log('erro')
    }
}



exports.autenticacaoToken = (req, res, next) => {
    const token = req.query.token; // Obtém o token da URL
    console.log("tokennn "+token)
  if (token == null) {
    return res.sendStatus(401); // Não autorizado
  }

  jwt.verify(token, process.env.PRIVATE_KEY_JWT, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Proibido
    }

    req.user = user;
    next();
  });
}

exports.verificacaoToken = (req, res, next) =>{
    const token = req.headers.authorization
    console.log("tokken "+token)
    try{
       // const tokenValue = token.split(' ')[1]
        jwt.verify(token, process.env.PRIVATE_KEY_JWT, (err, decoded) => {
            console.log('deveria entrar')
            if (err) return res.status(403).json({ message: 'Sem autorização :(' })
            next()
          })
    }catch(error){
        console.log(error)
    }
}