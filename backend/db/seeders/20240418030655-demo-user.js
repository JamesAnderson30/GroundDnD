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
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: "firstname",
        lastName: "lastName",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: "firstname",
        lastName: "lastName",
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: "firstname",
        lastName: "lastName",
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'test@user.io',
        username: 'TestMan',
        firstName: "firstname",
        lastName: "lastName",
        hashedPassword: bcrypt.hashSync('password4')
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
