'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
  }, {timestamps: false});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.hasMany(models.PostTag, {foreignKey: 'post_id', sourceKey: 'id'})
  };
  return Tag;
};