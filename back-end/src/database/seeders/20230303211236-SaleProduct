'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 1,
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 3,
        quantity: 1,
      },
      {
        sale_id: 2,
        product_id: 4,
        quantity: 1,
      },

    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};