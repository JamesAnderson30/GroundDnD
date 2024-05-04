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

     let result = await Image.bulkCreate([{
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
    url: "Spot1Preview.gif",
    preview:true
  }], {})

  console.log(result);

 // console.log(await Image.findAll());

  await ReviewImages.create({imgId:1, reviewId:1});
  await ReviewImages.create({imgId:2,reviewId:2});
  await SpotImages.create({imgId:3, spotId:1});
  await SpotImages.create({imgId:4, spotId:1});
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
