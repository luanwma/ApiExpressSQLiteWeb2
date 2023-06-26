const express = require('express')
const path = require('path')

const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
require('dotenv').config()



const sequelize = require("./src/config/database")


app.use('/api', require('./src/routes/routes.js'))


sequelize.sync().then( () =>{
    console.log("Database conectado")
    
})


app.listen(process.env.PORT_BACK || 3001, ()=>{
    if(process.env.PORT_BACK){
        console.log('Server running on -> '+'htp://localhost:'+process.env.PORT_BACK)
    }else{
        console.log('Servidor rodando ->' +'http://localhost:'+3001)

    }

})