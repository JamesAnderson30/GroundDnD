'use strict';
const {ReviewImages} = require("../models")
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

    // ~!!!!!!!!!!!!!!!!!!!!!!! this is actually review-images

    //  await ReviewImages.bulkCreate([{
    //    imgId: 1,
    //    reviewId:1
    //  },{
    //   imgId:2,
    //   reviewId:2
    //  }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await ReviewImages.destroy({where: {}});
  }
};
