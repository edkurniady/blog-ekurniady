'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER, references: {
          model: 'Posts',
          key: 'id',
        },
      },
      tag_id: {
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