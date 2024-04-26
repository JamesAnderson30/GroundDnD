'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   spot.belongsToMany(models.user, {
    //     foreignKey: "ownerId"
    //   }),

    // //   spot.hasMany(models.review, {
    // //     foreignKey: "spotId"
    // //   }),

    // //   spot.hasMany(models.spotsImages, {
    // //     foreignKey: "spotId"
    // //   }),

    //   spot.hasMany(models.booking, {
    //     foreignKey: "spotId"
    //   })
    }
  }
  spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'spot',
  });
  return spot;
};
