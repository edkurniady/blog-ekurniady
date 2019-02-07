'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PostTags', [
      {
        post_id: 1,
        tag_id: 2
      },
      {
        post_id: 1,
        tag_id: 1
      },
      {
        post_id: 2,
        tag_id: 2
      },
      {
        post_id: 3,
        tag_id: 3
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PostTags', null, {});
  }
};
