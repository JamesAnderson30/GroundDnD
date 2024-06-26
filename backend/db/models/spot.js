'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        constraints: false
      })

      Spot.hasMany(models.Review,{
        foreignKey: "spotId"
      })

      Spot.belongsToMany(models.Image, {
        through: "SpotImages",
        foreignKey: "spotId"
      })

      Spot.belongsTo(models.User,{
        foreignKey:"ownerId"
      })

      Spot.hasMany(models.Booking,{
        foreignKey: "spotId"
      })
    // //   Spot.hasMany(models.review, {
    // //     foreignKey: "SpotId"
    // //   }),

    // //   Spot.hasMany(models.SpotsImages, {
    // //     foreignKey: "SpotId"
    // //   }),

    //   Spot.hasMany(models.booking, {
    //     foreignKey: "SpotId"
    //   })
    }
  }
  Spot.init({
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
    tableName: 'Spots',
  });
  return Spot;
};
