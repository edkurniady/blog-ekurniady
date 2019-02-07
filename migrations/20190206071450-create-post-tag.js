'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostTags', {
      post_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER, references: {
          model: 'Posts',
          key: 'id',
        },
      },
      tag_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER, references: {
          model: 'Tags',
          key: 'id',
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PostTags');
  }
};