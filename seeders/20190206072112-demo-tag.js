'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      {
        name: 'Horror',
      },
      {
        name: 'Comedy',
      },
      {
        name: 'Education',
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
