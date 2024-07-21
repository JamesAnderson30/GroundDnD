'use strict';


const { Spot, Booking } = require('../models');
const bcrypt = require("bcryptjs");


let options = {
  tableName:"Spots"
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert(options, [{
        ownerId: 1,
        address: "Testy Rd",
        city: "Testy Mc Test Town",
        state: "Georgia unfortunately",
        country: "Empire Earth",
        lat: 50.2,
        lng: 21.5,
        name: "Some Spot",
        description: "Test Description Oh My! Test Description Oh My!Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! Test Description Oh My! ",
        price: 20.20
      },
    {
      ownerId: 1,
        address: "Testy Rd",
        city: "Testy Mc Test Town",
        state: "Georgia unfortunately",
        country: "Empire Earth",
        lat: 50.2,
        lng: 21.5,
        name: "Second Spot",
        description: "Descriptionunfortunatelyunfortunatelyunfortunately",
        price: 20.20
    },
  {
    ownerId: 1,
        address: "Third Rd",
        city: "Testy Mc Test Town",
        state: "Georgia unfortunately",
        country: "Empire Earth",
        lat: 50.2,
        lng: 21.5,
        name: "Third Spot",
        description: "DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription",
        price: 20.20
  },
  {
    ownerId: 3,
      address: "4444 Rd",
      city: "Review Me",
      state: "Georgia unfortunately",
      country: "Empire Earth",
      lat: 50.2,
      lng: 21.5,
      name: "Second Spot",
      description: "Descriptionunfortunatelyunfortunatelyunfortunately",
      price: 20.20
  },], );

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
    await Booking.destroy({where:{}})
    await Spot.destroy({where:{}});
  }
};
