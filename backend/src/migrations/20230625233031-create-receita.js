'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Receitas', {
      nomeReceita :{ type:DataTypes.STRING, allowNull:false },
      idCategoria : { type:DataTypes.INTEGER, allowNull:false, references:{ model : Categoria,key: 'idCategoria',},},
      userid : {type:DataTypes.INTEGER, allowNull:false,references:{model : User, key:'userid',},},
      descricao : { type:DataTypes.STRING},
      ingredientes : {type:DataTypes.STRING}, 
      modoPreparo :{ type:DataTypes.STRING },
      idReceita :{type : DataTypes.INTEGER, allowNull:false,primaryKey:true, autoIncrement:true},
      createdAt: {allowNull:false, type:Sequelize.DATE},
      updatedAt: {allowNull:false, type:Sequelize.DATE}, 
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Receitas')
  }
};
