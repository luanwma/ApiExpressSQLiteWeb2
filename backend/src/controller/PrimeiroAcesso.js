const Receita = require('../models/Receita')
const Categoria = require('../models/Categoria')
const User = require('../models/User')

const sequelize = require('../config/database')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const listaUsers = [
    { nome:"nome usuario 1",
    email : "emailusuario1@email.com",
    password : "passwordusuario1",
    dataNascimento: "2001-01-01"},
    {
        nome:"nome usuario 2",
        email : "emailusuario2@email.com",
        password : "passwordusuario2",
        dataNascimento: "2001-01-01" 
    },{
        nome:"nome usuario 3",
        email : "emailusuario3@email.com",
        password : "passwordusuario3",
        dataNascimento: "2001-01-01"
    },{
        nome:"nome usuario 4",
        email : "emailusuario4@email.com",
        password : "passwordusuario4",
        dataNascimento: "2001-01-01"
    },{
        nome:"nome usuario 5",
        email : "emailusuario5@email.com",
        password : "passwordusuario5",
        dataNascimento: "2001-01-01"
    }
 ]


const listaCategoria = [
    {nomeCategoria : "Categoria 1 usuario 1",
    descricao : "Categoria 1 relacionada ao usuario 1",
    userid:"1"},
    {nomeCategoria : "Categoria 2 usuario 1",
    descricao : "Categoria 2 relacionada ao usuario 1",
    userid:"1"},
    {
        nomeCategoria : "Categoria 3 usuario 1",
        descricao : "Categoria 3 relacionada ao usuario 1",
        userid:"1"   
    },
    {nomeCategoria : "Categoria 1 usuario 2",
    descricao : "Categoria 1 relacionada ao usuario 2",
    userid:"2"},
    {nomeCategoria : "Categoria 2 usuario 2",
    descricao : "Categoria 2 relacionada ao usuario 2",
    userid:"2"

    },{
        nomeCategoria : "Categoria 3 usuario 2",
        descricao : "Categoria 3 relacionada ao usuario 2",
        userid:"2"
    },{
        nomeCategoria : "Categoria 1 usuario 3",
        descricao : "Categoria 1 relacionada ao usuario 3",
        userid:"3"   
    },{
        nomeCategoria : "Categoria 2 usuario 3",
    descricao : "Categoria 2 relacionada ao usuario 3",
    userid:"3"
    },{
        nomeCategoria : "Categoria 3 usuario 3",
    descricao : "Categoria 3 relacionada ao usuario 3",
    userid:"3"
    }

]



const listaReceita = [
    {
        nomeReceita:"Receita 1 relacionada ao usuario 1 e categoria 1",
        idCategoria:"1",
        descricao:" Receita 1 relacionada ao usuario 1 e categoria 1",
        ingredientes:" Receita 1 relacionada ao usuario 1 e categoria 1 ",
        modoPreparo : " Receita 1 relacionada ao usuario 1 e categoria 1 ",
        userid : "1"
    
    },{
        nomeReceita:"Receita 2 relacionada ao usuario 1 e categoria 1",
        idCategoria:"1",
        descricao:" Receita 2 relacionada ao usuario 1 e categoria 1",
        ingredientes:" Receita 2  relacionada ao usuario 1 e categoria 1 ",
        modoPreparo : " Receita 2 relacionada ao usuario 1 e categoria 1 ",
        userid : "1"
    
    },{
        nomeReceita:"Receita 3 relacionada ao usuario 1 e categoria 1",
        idCategoria:"1",
        descricao:" Receita 3 relacionada ao usuario 1 e categoria 1",
        ingredientes:" Receita 3 relacionada ao usuario 1 e categoria 1 ",
        modoPreparo : " Receita 3 relacionada ao usuario 1 e categoria 1 ",
        userid : "1"
    
    },{
        nomeReceita:"Receita 4 relacionada ao usuario 1 e categoria 1",
        idCategoria:"1",
        descricao:" Receita 4 relacionada ao usuario 1 e categoria 1",
        ingredientes:" Receita 4 relacionada ao usuario 1 e categoria 1 ",
        modoPreparo : " Receita 4 relacionada ao usuario 1 e categoria 1 ",
        userid : "1"
    
    },{
        nomeReceita:"Receita 5 relacionada ao usuario 1 e categoria 1",
        idCategoria:"1",
        descricao:" Receita 4 relacionada ao usuario 1 e categoria 1",
        ingredientes:" Receita 4 relacionada ao usuario 1 e categoria 1 ",
        modoPreparo : " Receita 4 relacionada ao usuario 1 e categoria 1 ",
        userid : "1"
    
    },{
        nomeReceita:"Receita 1 relacionada ao usuario 1 e categoria 2",
        idCategoria:"2",
        descricao:" Receita 1 relacionada ao usuario 1 e categoria 2",
        ingredientes:" Receita 1 relacionada ao usuario 1 e categoria 2 ",
        modoPreparo : " Receita 1 relacionada ao usuario 1 e categoria 2 ",
        userid : "1"
    
    },{
        nomeReceita:"Receita 1 relacionada ao usuario 1 e categoria 2",
        idCategoria:"2",
        descricao:" Receita 1 relacionada ao usuario 1 e categoria 2",
        ingredientes:" Receita 1 relacionada ao usuario 1 e categoria 2 ",
        modoPreparo : " Receita 1 relacionada ao usuario 1 e categoria 2 ",
        userid : "1"
    
    },
    {
        nomeReceita:"Receita 1 relacionada ao usuario 2 e categoria 4",
        idCategoria:"4",
        descricao:" Receita 1 relacionada ao usuario 2 e categoria 4",
        ingredientes:"Receita 1 relacionada ao usuario 2 e categoria 4 ",
        modoPreparo : " Receita 1 relacionada ao usuario 2 e categoria 4 ",
        userid : "2"
    
    },
    {
        nomeReceita:"Receita 2 relacionada ao usuario 2 e categoria 4",
        idCategoria:"4",
        descricao:" Receita 2 relacionada ao usuario 2 e categoria 4",
        ingredientes:"Receita 2 relacionada ao usuario 2 e categoria 4 ",
        modoPreparo : " Receita 2 relacionada ao usuario 2 e categoria 4 ",
        userid : "2"
    
    }

]



exports.createAllData = async (req, res) =>{
    try {
      
    
        await User.bulkCreate(listaUsers)
        await Categoria.bulkCreate(listaCategoria)
        await Receita.bulkCreate(listaReceita)
      
        return res.sendStatus(200);
    } catch (error) {
        console.log("Erro na criação das primeiros dados "+error)
        return res.status(500).json({erro : "erro ao criar os primeiros dados" +error})
    }

}
