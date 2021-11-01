'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Games', 'status', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Games', 'status', Sequelize.STRING);
  },
};
