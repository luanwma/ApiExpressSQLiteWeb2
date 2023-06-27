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

router.post('/login', loginControl.login, receitaControl.createReceita) 

router.post('/cadastro_usuario',  userControl.createUser )
router.get('/listar_usuarios', userControl.listarUsuarios )

//rotas privadas receita
router.post('/cadastro_receita',autenticacaoToken.validarJwt, receitaControl.createReceita )

router.put('/alterar_receita/:id' , autenticacaoToken.validarJwt,receitaControl.updateReceita)
router.get('/minhas_receitas',autenticacaoToken.validarJwt,  receitaControl.listarReceitas)
router.get('/minhas_receitas/:id',autenticacaoToken.validarJwt,  receitaControl.visualizarReceita)
router.delete('/deletar_receita/:id', autenticacaoToken.validarJwt, receitaControl.deleteReceita)


//rotas privadas categoria

router.post('/cadastro_categoria', autenticacaoToken.validarJwt , categoriaControl.createCategoria)
router.get('/listar_categorias', autenticacaoToken.validarJwt, categoriaControl.listarCategorias)
router.put('/atualizar_categoria/:id', autenticacaoToken.validarJwt, categoriaControl.updateCategoria)
router.delete('/deletar_categoria/:id',autenticacaoToken.validarJwt, categoriaControl.deleteCategoria)
// rotas de categoria prontas


//rotas privadas de usuario

router.get('/perfil',autenticacaoToken.validarJwt, userControl.getUserById ) //ok
//router.post('/cadastro_usuario',userControl.createUser )
router.put('/atualizar_usuario/:id', autenticacaoToken.validarJwt, userControl.updateUser) 
//rota acima também funciona so precisa alterar o id da busca
router.put('/atualizar_usuario', autenticacaoToken.validarJwt, userControl.updateUser)
router.delete('/deletar_usuario/:id', autenticacaoToken.validarJwt, userControl.deleteUser)
router.delete('/deletar_usuario', autenticacaoToken.validarJwt, userControl.deleteUser)

router.get('/impressao_relatorio_usuario/:id', autenticacaoToken.validarJwt, userControl.impressaoRelatorio)


module.exports = router


