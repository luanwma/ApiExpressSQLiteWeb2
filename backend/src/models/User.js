const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')


// class User extends Model {}

const User = sequelize.define('User', { 
     
         userid: {type :DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
         nome:{ type: DataTypes.STRING, allowNull: false},
         email:{ type: DataTypes.STRING, allowNull: false , unique:true},
         password:{ type: DataTypes.STRING, allowNull: false, select: false},
         dataNascimento : {
             type: DataTypes.DATE,
             allowNull: true,
         }, 
         loginCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        } 




         
      }, {
         sequelize : sequelize,
         modelName : "users",
         timestamps : true
      })
     

    
     
 
 
 module.exports = User