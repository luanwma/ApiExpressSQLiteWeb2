const Sequelize = require("sequelize")
const sequelize = new Sequelize("cookbook", "user", "password" , {
    dialect : "sqlite",
    host: "backend/src/migrations/dev.sqlite",
    storage:'backend/src/migrations/database.sqlite',
    define : {
        timestamps : true, // salva data e hora de modificações
        underscored : false // se a tabela estiver com letra maiuscula criara com letra maiuscula se V
        
    }
})

//criar migrations rodar terminal
//npx sequelize migration:create --name=create-User
//criar bd


module.exports = sequelize;