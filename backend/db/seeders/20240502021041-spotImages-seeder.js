'use strict';
const {SpotImages} = require("../models")
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

     await SpotImages.bulkCreate([{
       imgId: 3,
       spotId:1
     },
    {
      imgId:4,
      spotId:1
    },
    {
      imgId:5,
      spotId:2
    },
    {
      imgId:1,
      spotId:3
    },
    {
      img:2,
      spotId:4
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await SpotImages.destroy({where: {}});
  }
};
