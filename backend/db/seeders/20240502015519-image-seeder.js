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
       url:"https://www.homestratosphere.com/wp-content/uploads/2018/07/green-house-example2018-07-09-at-5.03.11-PM-31-870x579.jpg",
       preview: true
     },
    {
      url: "https://i0.wp.com/freshouz.com/wp-content/uploads/2018/04/Exterior-House-Paint-Color-Schemes-16.jpg?fit=2250%2C1500&ssl=1",
      preview:true
    },
  {
    url: "https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg",
    preview:false
  },
  {
    url: "https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2017/07/16012347/rustic-retreat-home-exterior-1-oct162019.jpg",
    preview:true
  },
    {
      url: "https://topdreamer.com/wp-content/uploads/2014/12/2.jpg",
      preview:true
    },
  {
    url: "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555379295/shape/mentalfloss/9-detroit.jpg?itok=Zz3uWJXshttps://s3-us-west-2.amazonaws.com/hfc-ad-prod/plan_assets/324999613/large/790046GLV.jpg",
    preview:true
  }
  ], {})

  //////console.log(result);

 // ////console.log(await Image.findAll());

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
