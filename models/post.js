'use strict';
// var Model = require('../../models/').PostTag

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.PostTag, {foreignKey: 'post_id', sourceKey: 'id'})
    // Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
    // City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});
  };
  return Post;
};