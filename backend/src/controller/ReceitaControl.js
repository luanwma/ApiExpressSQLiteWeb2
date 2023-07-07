const Receita = require('../models/Receita')
const Categoria = require('../models/Categoria')
const User = require('../models/User')

const sequelize = require('../config/database')

const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createReceita = async (req, res) =>{
    const userid = req.userid
    console.log("criando receita user id da req "+userid)
    // pegar o id do usuario da requisição ao inves do header
    
    console.log("userid em receita -> "+userid)
    const nomeReceita = req.body.nomeReceita
    const idCategoria = req.body.idCategoria
    console.log("id categoria dentro da receita "+idCategoria)

    
    const descricao = req.body.descricao
    const ingredientes = req.body.ingredientes
    const modoPreparo = req.body.modoPreparo
    try{    
        const cat = await Categoria.findByPk(idCategoria)
        if(cat &&  cat.userid === userid){
            const novaReceita = await Receita.create({nomeReceita,  idCategoria, userid,
                descricao,ingredientes,modoPreparo })
                return res.status(201).json(novaReceita)
        }else{
            console.log("erro ")
            return res.status(500).json({erro: "a categoria nao existe no usuario "})
        }

        
             
    }catch(error){
        console.log("Erro ao criar receita: ", error);
        return res.status(500).json({error:'Erro ao criar receita'})

    }
}

exports.updateReceita = async (req, res) =>{
    const idRec = req.params.id
    const userid = req.userid
    //const  idReceita = req.headers.idReceita
    const nomeReceita = req.body.nomeReceita
    const idCategoria = req.body.idCategoria
    console.log("id categoria dentro da receita "+idCategoria)
    console.log("nome receita body "+nomeReceita)
    
    const descricao = req.body.descricao
    const ingredientes = req.body.ingredientes
    const modoPreparo = req.body.modoPreparo
    console.log("user id update "+userid)
    console.log("idrec params "+idRec)


    //impedir que um usuario altere uma receita que não é dele e nenhum outro campo


    try{

        const user = await User.findByPk(userid)
        console.log("user update "+user.userid)
        if(user){
            const receita = await Receita.findByPk(idRec)
            console.log("receita update "+receita.idReceita)

            if(receita && receita.userid == user.userid ){
                receita.nomeReceita =  nomeReceita
                receita.idCategoria =   idCategoria
              
                receita.descricao = descricao
                receita.ingredientes = ingredientes
                receita.modoPreparo = modoPreparo
                await receita.save();
    
                return res.sendStatus(204).json(receita)
            }

        }else{
            console.log("usuario nao existe ")
        }
        /*
        const receita = await Receita.findByPk(idReceita)
        if(receita){
            receita.nomeReceita =  nomeReceita
            receita.idCategoria =   idCategoria
           // receita.userid =    userId
            receita.descricao = descricao
            receita.ingredientes = ingredientes
            receita.modoPreparo = modoPreparo
            await receita.save();

            return res.sendStatus(204).json(receita)
        }
        */
      
    }catch(error){
        console.log("Erro ao editar receita: ", error);
        return res.status(400)
    }
}

exports.deleteReceita = async (req, res) =>{
    const idRec = req.params.idReceita
    console.log("id rec  "+idRec)

    try {
        const receita = await Receita.findByPk(idRec)
        if(receita){
            await receita.destroy()
            return res.status(201)
           
        }else{
            console.log("Erro ao deletar receita: ");
            return res.status(500).json({error : 'Erro ao deletar receita'})
        }

    } catch (error) {
        console.log('Erro ao deletar a receita', error )
        return res.status(500).json({ mensagem : 'Erro ao encontrar receita'+error})
    }

    
    
  
}

exports.listarReceitas = async (req, res) =>{
    const userId = req.userid
    console.log("listar receitas "+userId)
    

    try{
        const receitas = await Receita.findAll({where : {userid : userId}})

        const listaReceitas = receitas.map(receita => (   {
            idReceita:receita.idReceita,
            nomeReceita :receita.nomeReceita,
            descricao:receita.descricao,
            ingredientes:receita.ingredientes,
            modoPreparo:receita.modoPreparo,
            idCategoria:receita.idCategoria

    }))

   

        return res.status(200).json(listaReceitas)

    }catch(error){
        console.log('Erro ao listar as receitas', error )
        return res.status(500).json({ mensagem : 'Erro ao listar receitas'+error})
    }
}

exports.visualizarReceita = async (req, res)=>{
    const idRec = req.params.idReceita
    console.log("id rec  "+idRec)

    const receita = await Receita.findByPk(idRec)
    if(!receita ){
        return res.status(404).json({message:'Receita não existe' +receita})
        }
    else{
            var dadosReceita = receita.toJSON();
           // delete dadosReceita['dataCadastro']
            //delete dadosReceita['updatedAt']
           // delete dadosReceita['createdAt']
           console.log(receita)
           return res.status(200).json(receita)
        }
        


}