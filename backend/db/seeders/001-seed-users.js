'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {
  schema: process.env.NODE_ENV === 'production' ? process.env.SCHEMA : null,
  tableName: 'Users'
}

const demoUsers = [
  {
    email: 'demo@user.io',
    username: 'yung-demo',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    email: 'user1@user.io',
    username: 'fakeUser1',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    email: 'user2@user.io',
    username: 'fakeUser2',
    hashedPassword: bcrypt.hashSync('password')
  }
];
const demoUserNames = demoUsers.map(user => user.username);

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate( demoUsers, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {[Op.in]: demoUserNames}
    }, {})
  }
};
