'use strict';

const bcrypt = require('bcrypt');

const hashRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.bulkInsert('Users', [{
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
    }], { returning: true });

    const [game] = await queryInterface.bulkInsert('Games', [{
      currentPlayerId: users[0].id,
      status: 'preparation',
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });

    queryInterface.bulkInsert('UsersGames', [{
      playerId: users[0].id,
      gameId: game.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      playerId: users[1].id,
      gameId: game.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UsersGames', null, {});
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Tokens', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
