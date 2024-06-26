'use strict';
const {User} = require('./index')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ////console.log(sequelize.models);
      Booking.belongsTo(sequelize.models.User, {
        foreignKey: "userId"
      });

      Booking.belongsTo(models.Spot, {
        foreignKey: "spotId"
      })
    }
  }
  Booking.init({
    userId: DataTypes.INTEGER,
    SpotId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
