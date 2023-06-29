'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userid: {type :DataTypes.INTEGER, allowNull:false, primaryKey: true, autoIncrement: true},
      nome:{ type: DataTypes.STRING, allowNull: false},
      email:{ type: DataTypes.STRING, allowNull: false , unique:true},
      password:{ type: DataTypes.STRING, allowNull: false, select: false},
      dataNascimento : {type: DataTypes.DATE, allowNull: true},
      createdAt: {allowNull:false, type:Sequelize.DATE},
      updatedAt: {allowNull:false, type:Sequelize.DATE},
  
     })

     await queryInterface.addConstraint('Users', {
      fields: ['userid'],
      type: 'foreign key',
      name: 'FK_Users_Categorias_userid',
      references: {
        table: 'Categorias',
        field: 'userid',
      },
      onDelete: 'CASCADE', // Adicione essa opção para exclusão em cascata
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
};
