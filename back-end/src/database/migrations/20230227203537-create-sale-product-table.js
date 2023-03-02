'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', { 
      sale_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sales', // faz referencia a tabela
          key: "id",
        }
      },
      product_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products', // faz referencia a tabela
          key: "id",
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales_products');
  }
};