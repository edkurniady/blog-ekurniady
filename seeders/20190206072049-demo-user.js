'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'demo@demo.com',
        username: 'jdoe',
        password: 'jdoe'
      },
      {
        name: 'Kevin Tigra',
        email: 'ktv@ktv.com',
        username: 'ktv',
        password: 'ktv'
      },
      {
        name: 'Edward Kurniady',
        email: 'edkurniady@gmail.com',
        username: 'edk',
        password: 'edk'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
