'use strict';

const { Sequelize } = require('sequelize');
const { User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {
  schema: "groundDB"
};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        id:1,
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id:2,
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id:3,
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id:4,
        email: 'test@user.io',
        username: 'TestMan',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        id:5,
        username: "firstaatester",
        email: "testTest@user.io",
        hashedPassword: bcrypt.hashSync("secret password")
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    // options.tableName = 'Users';
    // const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'ID4'] }
    // }, {});
    await User.destroy({where:{}})
  }
};
