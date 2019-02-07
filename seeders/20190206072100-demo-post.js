'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'John Doe Post',
        content: 'This is JD\'s post',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 1
      },
      {
        title: 'Kevin Tigra Post',
        content: 'ktvktv',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 2
      },
      {
        title: 'Edward Kurniady',
        content: 'Pepega',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 3
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
