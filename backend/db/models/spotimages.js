'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImages.belongsTo(models.Image,{
        foreignKey:"imgId",
        onDelete: "CASCADE",
        hooks:true
      })

      SpotImages.belongsTo(models.Spot,{
        foreignKey:"imgId",
        onDelete: "CASCADE",
        hooks:true
      })
    }
  }
  SpotImages.init({
    imgId: DataTypes.INTEGER,
    spotId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpotImages',
  });
  return SpotImages;
};
