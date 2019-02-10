'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      {
        title: 'Iprem Losum',
        content: 'Integer sit amet sapien eu dui molestie efficitur et malesuada lacus. Etiam dictum dignissim ex, eget vulputate lectus consectetur eget.',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 1,
        creator: 'John Doe'
      },
      {
        title: 'Lorem Pisum',
        content: 'Maecenas turpis turpis, fringilla sed arcu nec, commodo iaculis sem. Maecenas elit dolor, maximus a justo sed, auctor lacinia nisi.',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 2,
        creator: 'Kevin Tigra'
      },
      {
        title: 'Lorem Ipsum 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 3,
        creator: 'Edward Kurniady'
      },
      {
        title: 'Lorem Ipsum 2',
        content: 'Praesent vel ante sodales nulla pellentesque hendrerit. Nam velit mi, varius a felis blandit, consectetur posuere nisi. Sed sed laoreet quam, sit amet accumsan augue.',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        user_id: 3,
        creator: 'Edward Kurniady'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
