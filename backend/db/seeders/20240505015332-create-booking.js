'use strict';

let options = {
  tableName:"Bookings"
};

let tableOptions = {
  tableName:"Bookings"
}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options

}


const { query } = require("express");
const {Booking} = require("../models");
const { QueryInterface, DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */


    // await Booking.create({
    //   userId:1,
    //   spotId:1,
    //   startDate: new Date("2024-03-25"),
    //   endDate: new Date("2024-03-25")
    // }, options);

    await queryInterface.bulkInsert(options, [{
      userId:1,
      spotId:1,
      startDate: new Date(2024, 5, 15),
      endDate: new Date(2024, 5, 30)
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await Booking.destroy({where: {}});
  }
};
