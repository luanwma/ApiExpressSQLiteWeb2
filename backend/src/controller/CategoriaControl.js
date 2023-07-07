const Categoria = require('../models/Categoria')
const Receita = require('../models/Receita')

const sequelize = require('../config/database.js')

require('dotenv').config()

exports.createCategoria = async (req, res) =>{
    
    const token = req.headers.token
    if(!token){
        return res.status(401).json({mensagem: "token invalido"})
    }
    
    const userId = req.userid
    
    console.log("controle userid "+userId)
    
    const {nomeCategoria} = req.body
    console.log("controle nCategoria "+nomeCategoria)
    const descricao = req.body.descricao
    try{
        const categoria = await Categoria.create({
            userid: userId, 
            nomeCategoria : nomeCategoria, 
            descricao : descricao
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
        
        if(categorias){
            const listaCat = categorias.map(cat =>({
                userid : cat.userid,
                idCategoria : cat.idCategoria,
                nomeCategoria : cat.nomeCategoria,
                descricao : cat.descricao
    
            }))
            return res.status(200).json(listaCat)
        }
        else{
            return res.status(404).json({mensagem : 'Usuario nao tem nenhuma categoria cadastrada!'})  
        }
        
    } catch (error) {
        console.log("Erro ao listar categorias "+error)
        return res.status(500).json({ mensagem : 'Erro ao listar receitas'})
    }
}

exports.updateCategoria = async(req, res) =>{


    const idCategoria = req.params.id
    console.log("id cat "+idCategoria)
    const userId = req.userid


    console.log("id user "+userId)
    
    const obj = req.body
    console.log(obj)
    const {nomeCategoria} = req.body
    console.log("controle nCategoria "+nomeCategoria)
    const descricao = req.body.descricao
    
    console.log("descricao cat -> "+descricao)
    try {
        const categoria = await Categoria.findByPk(idCategoria)
        if(categoria && categoria.userid === userId){
            categoria.nomeCategoria = nomeCategoria
            categoria.descricao = descricao

            await categoria.save()
            
            return res.status(200).json(categoria)
        }
        else{
            return res.status(404).json({mensagem : 'Categoria nao encontrada'})
        }
    } catch (error) {
        console.log("Erro ao atualizar categorias "+error)
        return res.status(500).json({ mensagem : 'Erro ao atualizar categoria'})
    }

}

exports.deleteCategoria = async (req, res )=>{
    const idCategoria = req.params.id
    console.log("id cat "+idCategoria)
    const userId = req.userid
    console.log("id user "+userId)

    try {
        const categoria = await Categoria.findOne({ where: { idCategoria: idCategoria } });
        if (categoria) {
          const listaReceitas = await Receita.findAll({ where: { idCategoria: idCategoria } });
          console.log('lista receitas ' + listaReceitas);
          const list = listaReceitas.map(rec => ({
            idReceita: rec.dataValues['idReceita'],
            nomeReceita: rec.nomeReceita,
            idCategoria: rec.idCategoria
          }));
    
          for (let i = 0; i < list.length; i++) {
            const rec = list[i];
            console.log('receita a ser excluida' + JSON.stringify(rec));
            await Receita.destroy({ where: { idReceita: rec.idReceita } });
          }
    
          await categoria.destroy();
          return res.status(200).json({ mensagem: 'Todas as receitas relacionadas à categoria foram também excluídas junto com a categoria' });
        }
      } catch (error) {
        console.log("Erro ao deletar categoria " + error);
        return res.status(500).json({ mensagem: 'Erro ao deletar categoria' });
      }
}