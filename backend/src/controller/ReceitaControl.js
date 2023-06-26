const Receita = require('../models/Receita')
const Categoria = require('../models/Categoria')

const sequelize = require('../config/database')

const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createReceita = async (req, res) =>{
    const userid = req.userid
    console.log("userid em receita -> "+userid)
    const nomeReceita = req.body.nomeReceita
    const idCategoria = req.body.idCategoria
    const descricao = req.body.descricao
    const ingredientes = req.body.ingredientes
    const modoPreparo = req.body.modoPreparo
    try{
        const novaReceita = await Receita.create({nomeReceita,  idCategoria, userid,
             descricao,ingredientes,modoPreparo })
             return res.status(201).json(novaReceita)
    }catch(error){
        console.log("Erro ao criar receita: ", error);
        return res.status(500).json({error:'Erro ao criar receita'})

    }
}

exports.updateReceita = async (req, res) =>{
    const  idReceita = req.headers.idReceita
    const nomeReceita = req.body.nomeReceita
    const idCategoria = req.body.idCategoria
    const descricao = req.body.descricao
    const ingredientes = req.body.ingredientes
    const modoPreparo = req.body.modoPreparo
    try{

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
      
    }catch(error){
        console.log("Erro ao editar receita: ", error);
        return res.status(500).json({error:'Erro ao editar receita'})
    }
}

exports.deleteReceita = async (req, res) =>{
    const idReceita = req.params.idReceita
    try{
        const receita = await Receita.findByPk(idReceita)
        if(receita){
            await receita.destroy()
            return res.sendStatus(204).json({mensagem : 'Receita excluida'})
        }else{
            return res.status(404).json({error: 'Receita nao encontrada'})
        }

    }catch(error){
        console.log("Erro ao deletar receita: ", error);
        return res.status(500).json({error : 'Erro ao excluir receita'})
    }
}

exports.listarReceitas = async (req, res) =>{
    const userId = req.userid
    console.log("listar receitas "+userId)
    

    try{
        const receitas = await Receita.findAll({where : {userid : userId}})

        const listaReceitas = receitas.map(receita => ({
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
        return res.status(500).json({ mensagem : 'Erro ao listar receitas'})
    }
}