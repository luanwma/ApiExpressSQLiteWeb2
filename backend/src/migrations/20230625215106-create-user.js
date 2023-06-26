'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userid: {type :DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
      nome:{ type: DataTypes.STRING, allowNull: false},
      email:{ type: DataTypes.STRING, allowNull: false , unique:true},
      password:{ type: DataTypes.STRING, allowNull: false},
      dataNascimento : {type: DataTypes.DATE, allowNull: true},
      createdAt: {allowNull:false, type:Sequelize.DATE},
      updatedAt: {allowNull:false, type:Sequelize.DATE},
  
     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
};
