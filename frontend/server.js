const express = require("express")
const app = express()
const path = require('path')

require('dotenv').config()
const axios = require('axios')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())

const mustacheExpress = require('mustache-express');
app.engine("mustache", mustacheExpress())
app.set("views", path.join(__dirname, "./src", "/views"))
app.set("view engine", "mustache")
console.log(__dirname)

app.use(express.static(path.join(__dirname,'./src','/views')))

const nodemailer = require('nodemailer')


//rotas


app.get('/' , (req, res) =>{
    res.render('login')
})

app.get('/login', (req, res) =>{
    res.render('login')
})

app.get('/recuperar_senha', (req, res) =>{
    res.render('recuperar_senha')
})

app.get('/cadastro_usuario', (req, res) =>{
    res.render('cadastro_usuario')
})

app.get('/cadastro_receita', (req, res) =>{
    res.render('cadastro_receita')
})

app.get('/minhas_receitas', (req, res) =>{
    res.render('minhas_receitas')
})

app.get('/cadastro_categoria', (req, res) =>{
    res.render('cadastro_categoria')
})



app.get('/contato', (req, res) =>{
    res.render('contato')
})
app.post('/contato', (req, res) =>{
    const {nome, email, assunto, mensagem} = req.body
    console.log("nome -> ",nome," email -> ",email ," assunto -> ",assunto ," msg -> ",mensagem)
   

   
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS // generated ethereal password
        }
      });



    console.log("email",email)
    const mailBody = {
        
        sender:email,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: assunto,
        text: "Ola "+nome+"sua mensagem -> "+mensagem,
    

       // text: `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`
      };

      console.log(mailBody)

      transporter.sendMail(mailBody, (error, info) => {
        if (error) {
          console.log(error);
          res.send('Ocorreu um erro no envio da mensagem.');
        } else {
          console.log('Mensagem enviada: ' + info.response);
          res.send('Mensagem enviada com sucesso!');
          window.location.href = 'login'
        }
      });

     
})



app.get('/sobre', (req, res) =>{
    res.render('sobre')
})
app.get('/tecnologias', (req, res) =>{
    res.render('tecnologias')
})
/*
app.post('/cadastro_receitas', (req, res) =>{
    const {titulo} = req.body;
})
*/


/*
app.get('/login', (req, res) =>{
   
    res.sendFile(path.join(__dirname, '../view', 'login.mustache'))
})

app.get('/recuperar_senha', (req, res) =>{
    res.sendFile(path.join(__dirname, '../view', 'recuperar_senha.html'))
})

app.get('/cadastro_usuario', (req, res) =>{
    res.sendFile(path.join(__dirname,'../view', 'cadastro_usuario.html'))
})


app.get('/cadastro_receita', (req, res ) =>{

    res.sendFile(path.join(__dirname, '../view', 'cadastro_receita.html'))

})

app.get('/minhas_receitas', (req, res ) =>{

    res.sendFile(path.join(__dirname, '../view', 'minhas_receitas.html'))

})

app.get('/cadastro_categoria', (req, res) =>{
    res.sendFile(path.join(__dirname , '../view' , 'cadastro_categoria.html'))
})

app.get('/contato' , (req, res) => {
    res.sendFile(path.join(__dirname, '../view', 'contato.html'))
})


app.get('/sobre', (req, res) =>{
    res.sendFile(path.join(__dirname, '../view', 'sobre.html'))
})

*/


async function fetchReceitas(query) {
    try {
        const url = `http://localhost:3001/api/${query ? `?query=${query}` : ''}`
        const response = await axios.get(url)
        const receitas = response.data
        return items
    } catch (error) {
        console.error('Error fetching receitas:', error.message)
    }
}
async function fetchCategorias(query) {
    try {
        const url = `http://localhost:3001/api/minhas_receitas${query ? `?query=${query}` : ''}`
        const response = await axios.get(url)
        const categoria = response.data
        return creatures
    } catch (error) {
        console.error('Error fetching categorias:', error.message)
    }
}





app.listen(process.env.PORT_FRONT || 3000, ()=>{
    if(process.env.PORT){
        console.log('Server running on -> '+'htp://localhost:'+process.env.PORT_FRONT)
    }else{
        console.log('Servidor rodando ->' +'http://localhost:'+3000)

    }

    })