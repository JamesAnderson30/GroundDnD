'use strict';

let options = {
  tableName:"Reviews"
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Review } = require('../models');

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

     await queryInterface.bulkInsert(options, [{
       userId: 4,
       spotId: 1,
       review: "What a fantastic lovely spot indeed yes sir.",
       stars: 3
     },
    {
      userId:1,
      spotId:1,
      review: "This spot had all kinds of crazy rules, like I can only wear shoes.",
      stars:5
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await Review.destroy({where:{}});
  }
};
