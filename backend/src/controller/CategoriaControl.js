const Categoria = require('../models/Categoria')

const sequelize = require('../config/database.js')

require('dotenv').config()

exports.createCategoria = async (req, res) =>{
    const userId = req.userid
    
    console.log("controle userid "+userId)
    const nCategoria = req.body.nomeCategoria
    const tdescricao = req.body.descricao
    try{
        const categoria = await Categoria.create({
            userid: userId, 
            nomeCategoria : nCategoria, descricao : tdescricao
        })

        return res.status(201).json(categoria)
    }catch(error){
        console.log("Erro ao criar categoria "+error)
        return res.status(500).json({error: 'Erro ao criar categoria'})
    }

}

exports.listarCategorias = async (req, res) =>{
    const userId = req.userid
    console.log("listar categorias  user id -> "+userId)
    try {
        const categorias = await Categoria.findAll({where :{userid : userId}})
        
        const listaCat = categorias.map(cat =>({
            userid : cat.userid,
            idCategoria : cat.idCategoria,
            nomeCategoria : cat.nomeCategoria,
            descricao : cat.descricao

        }))
        return res.status(200).json(listaCat)
    } catch (error) {
        console.log("Erro ao listar categorias "+error)
        return res.status(500).json({ mensagem : 'Erro ao listar receitas'})
    }
}