'use strict';

const bcrypt = require('bcrypt');

const hashRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
      email: 'a@mail.a',
      password: bcrypt.hashSync('123', hashRounds),
      login: 'a',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'b@mail.b',
      password: bcrypt.hashSync('123', hashRounds),
      login: 'b',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
