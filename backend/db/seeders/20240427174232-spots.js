'use strict';


const { User, Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {

};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert({tableName:"Spots",schema:"GroundNdN"}, [{
        ownerId: 3,
        address: "Testy Rd",
        city: "Testy Mc Test Town",
        state: "Georgia unfortunately",
        country: "Empire Earth",
        lat: 50.2,
        lng: 21.5,
        name: "Some Spot",
        description: "Description",
        price: 20.20
      }], );

  },
  // ownerId: DataTypes.INTEGER,
  // address: DataTypes.STRING,
  // city: DataTypes.STRING,
  // state: DataTypes.STRING,
  // country: DataTypes.STRING,
  // lat: DataTypes.DECIMAL,
  // lng: DataTypes.DECIMAL,
  // name: DataTypes.STRING,
  // description: DataTypes.STRING,
  // price: DataTypes.DECIMAL



  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await Spot.destroy({where:{}, truncate: true});
  }
};
