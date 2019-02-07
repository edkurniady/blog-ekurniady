'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    post_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {timestamps: false});
  PostTag.associate = function(models) {
    // associations can be defined here
    PostTag.belongsTo(models.Post,  {foreignKey: 'post_id', sourceKey: 'id'})
  };
  return PostTag;
};