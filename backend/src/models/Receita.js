const {Model, DataTypes} = require("sequelize")
const sequelize = require('../config/database')
const Categoria = require('./Categoria');
const User = require('./User');

//class Receita extends Model{}
const Receita = sequelize.define( 'Receita',{
    nomeReceita :{ type:DataTypes.STRING, allowNull:false },
    idCategoria : { type:DataTypes.INTEGER, allowNull:false, references:{ model : Categoria,key: 'idCategoria',},},
    userid : {type:DataTypes.INTEGER, allowNull:false,references:{model : User, key:'userId',},},
    descricao : { type:DataTypes.STRING},
    ingredientes : {type:DataTypes.STRING}, 
    modoPreparo :{ type:DataTypes.STRING },
    idReceita :{type : DataTypes.INTEGER, allowNull:false,primaryKey:true, autoIncrement:true, },
},{
    sequelize: sequelize,
    modelName : "receitas",
    timestamps : true
})


Receita.belongsTo(Categoria, { foreignKey: 'idCategoria' });
Receita.belongsTo(User, { foreignKey: 'userid' });
Categoria.hasMany(Receita, { foreignKey: 'idCategoria' });
User.hasMany(Receita, { foreignKey: 'userid' });


module.exports = Receita