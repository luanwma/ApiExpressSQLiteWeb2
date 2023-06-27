const User = require('../models/User')
const sequelize = require('../config/database')

const jwt = require('jsonwebtoken');
const Categoria = require('../models/Categoria');
const Receita = require('../models/Receita')

require('dotenv').config()

exports.createUser = async (req, res) =>{
    
    const nome = req.body.nome
    const email = req.body.email
    const password = req.body.password
    const dataNascimento = req.body.dataNascimento

    console.log("nome "+nome)
    console.log("email "+email)
    console.log("senha "+password)
    console.log("dataNascimento "+dataNascimento)
    

    try{
        const novoUser = await User.create({nome, email, password, dataNascimento})
        
        return res.json(novoUser)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Erro ao criar usuario.'})
    }
}

exports.getUserById = async (req, res) =>{
    const userid = req.userid
    console.log("id get user -> "+userid)
    try{
        const user = await User.findByPk(userid);
        console.log("user" +user)
        if(user){
           return res.json(user)
        }else{
            return res.status(404).json({error: 'Usuario nao encontrado'})
        }

    } catch(error){ 
        console.log(error)
        return res.status(500).json({error:"Erro interno"}).json({error:'Erro ao encontrar usuario '})
    
    }
}

exports.updateUser = async (req, res) =>{
    const userid = req.userid
    const id = req.params.id
    console.log("update user id -> "+id)
    const nome = req.body.nome
    const email = req.body.email
    const password = req.body.password
    const dataNascimento = req.body.dataNascimento

    try{
        const user = await User.findByPk(userid)
        if(user){
            user.nome = nome
            user.email = email
            user.password = password
            user.dataNascimento = dataNascimento
            await user.save()
            return res.status(200).json(user)
            
        } else {
           return res.status(404).json({error: 'Usuario nao existe'})
          
        }
    } catch(error){
        
        console.log(error)
        return res.status(500).json({error :'Erro ao encontrar usuario'})
    }
}

exports.deleteUser = async (req, res) => {
    const userid = req.userid 
    console.log("update user id -> "+userid)
    try {
      const user = await User.findByPk(userid);

      if (user) {

        const categorias = await Categoria.findAll({where : {userid : userid}})
        const receitas = await Receita.findAll({where : {userid : userid}})

        const listCat = categorias.map(cat => ({
            idCategoria : cat.idCategoria,
            nomeCategoria: cat.nomeCategoria,
            descricao: cat.descricao

        }))
        
        const listRec = receitas.map(rec => ({
            idReceita : rec.idReceita,
            nomeReceita : rec.nomeReceita,
            idCategoria : rec.idCategoria
        }))

        for( let i = 0 ; i < listRec.length ; i++){
            var rec = listRec[i]
            console.log('receita a ser excluida' + JSON.stringify(rec));
            await Receita.destroy({where : {idReceita : rec.idReceita}})
        }
        
        for(let i=0;i<categorias.length ;i++){
            let cat = categorias[i]
            console.log('receita a ser excluida' + JSON.stringify(cat));
           await Categoria.destroy({ where : { idCategoria :cat.idCategoria }})

        }
         //   await user.destroy()
            //res.send('usuario deletado')
           
      
        await user.destroy({where : {userid : userid}});
        return res.json({ message: 'Usuario excluido com sucesso' });
      } else {
        return res.status(404).json({ error: 'Usuario nao encontrado.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao excluir o usuario.' });
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
           nome: user.nome, 
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

exports.impressaoRelatorio = async (req, res)=>{
    const userid = req.userid 
    console.log("update user id -> "+userid)
    
    try {

        const buscaCat = await Categoria.findAll({where : {userid : userid}})
        console.log(buscaCat)
        const buscaReceitas =  await Receita.findAll({where : {userid : userid}})
        console.log(buscaReceitas)
        var impressao = {}
        if (buscaCat) {
            var i =0 
            const listC = buscaCat.map(cat => ({
              idCategoria : cat.idCategoria,
              nomeCategoria: cat.nomeCategoria,
             
              
            }));
            console.log("list C ->"+listC.idCategoria)

            const listR = buscaReceitas.map( rec =>({
                idReceita : rec.idReceita,
                nomeReceita : rec.nomeReceita,


            }))
            let receitas = []
            console.log("list R ->"+listR.idReceita)

            for (let i = 0; i < listC.length; i++) {
                const cat = listC[i];
                const idCat = cat.idCategoria
               
                for (var j=0 ;j<listR.length;j++){
                    if (listR[j].idCategoria == idCat){
                        receitas.push(listR[j])
                    }
                }
                console.log(receitas)
                impressao[i]={...cat,...{receitas}}
                i++
            }
            
                
                
              //  await Receita.destroy({ where: { idReceita: rec.idReceita } });
              
        
              //await categoria.destroy();
              return res.status(200).json({ impressao });
        } 

        
    } catch (error) {
        console.log("Erro ao imprimir categoria " + error);
        return res.status(500).json({ mensagem: 'Erro ao imprimir categoria' });
    }
}


/*
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
*/
