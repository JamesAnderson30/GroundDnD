'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsToMany(models.Spot, {
        through: "SpotImages",
        foreignKey: "imgId",
        onDelete:"CASCADE",
        hooks:true
      }),
      Image.belongsToMany(models.Review, {
        through: "ReviewImages",
        foreignKey: "imgId"
      })
    }
  }
  Image.init({
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
