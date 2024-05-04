'use strict';

let options = {
  tableName:"Images"
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Image, SpotImages, ReviewImages} = require("../models");
const reviewimages = require("../models/reviewimages");
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

     await Image.bulkCreate([{
       url:"review1.jpg",
       preview: false
     },
    {
      url: "review2.png",
      preview:false
    },
  {
    url: "Spot1.jpg",
    preview:false
  },
  {
    id:4,
    url: "Spot1Preview.gif",
    preview:true
  }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await SpotImages.destroy({where:{}});
    await ReviewImages.destroy({where: {}});
    await Image.destroy({where:{}});
  }
};
