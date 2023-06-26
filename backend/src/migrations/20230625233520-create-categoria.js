'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Categorias', {
      userid : {type:DataTypes.INTEGER, allowNull:false,references:{model : User, key:'userid',},},
      nomeCategoria:{type: DataTypes.STRING,allowNull:false},
      idCategoria:{ type: Sequelize.INTEGER, primaryKey:true,  autoIncrement :true,},
      descricao : {type: DataTypes.STRING,allowNull:true},      
      createdAt: {allowNull:false, type:Sequelize.DATE},
      updatedAt: {allowNull:false, type:Sequelize.DATE},
  
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Categorias')
  }
};
