const express = require('express')

const router = express.Router()

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
const autenticacaoToken = require('./middleware')

const loginControl = require('../controller/LoginControler')
const userControl = require('../controller/UserControl')
const receitaControl = require('../controller/ReceitaControl')
const categoriaControl = require('../controller/CategoriaControl')

router.use(express.json())
require('dotenv').config()

//jwt instalar jsonwebtoken


//rotas publicas

router.post('/login', loginControl.login) 

router.post('/cadastro_usuario',  userControl.createUser )
router.get('/listar_usuarios', userControl.listarUsuarios )

//rotas privadas
router.post('/cadastro_receita',autenticacaoToken.validarJwt, receitaControl.createReceita )

router.put('/alterar_receita/:id' , autenticacaoToken.validarJwt,receitaControl.updateReceita)
router.get('/minhas_receitas',autenticacaoToken.validarJwt,  receitaControl.listarReceitas)
router.delete('/deletar_receita/:id', autenticacaoToken.validarJwt, receitaControl.deleteReceita)

router.post('/cadastro_categoria', autenticacaoToken.validarJwt , categoriaControl.createCategoria)
router.get('/listar_categorias', autenticacaoToken.validarJwt, categoriaControl.listarCategorias)


router.put('/user/:userid', )
router.post('/cadastro_usuario',userControl.createUser )

router
module.exports = router


