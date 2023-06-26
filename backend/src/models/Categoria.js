const {Model, DataTypes, Sequelize} = require("sequelize")
const sequelize = require("../config/database")
const User=require("./User");

//class Categoria extends Model{}
const Categoria = sequelize.define('Categoria',{
    userid : {type:DataTypes.INTEGER, allowNull:false,references:{model : User, key:'userid',},},
    nomeCategoria:{type: DataTypes.STRING,allowNull:false},
    idCategoria:{ type: Sequelize.INTEGER, primaryKey:true,  autoIncrement :true,},
    descricao : {type: DataTypes.STRING, allowNull:true}
},{
    sequelize : sequelize,
    modelName : "categorias",
    timestamps : true
} )
module.exports = Categoria