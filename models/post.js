'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.PostTag, {foreignKey: 'post_id', sourceKey: 'id'})
  };
  return Post;
};