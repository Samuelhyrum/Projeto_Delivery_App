'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 9.70,
        delivery_address: 'rua coisinha',
        delivery_number: '280',
        sale_date: '2023-03-03T18:43:25',
        status: 'Pendente'
      },
      {
        id: 2,
        user_id: 3,
        seller_id: 2,
        total_price: 9.99,
        delivery_address: 'rua coisinha 2',
        delivery_number: '352',
        sale_date: '2023-03-02T18:40:28',
        status: 'Pendente'
      },

    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};