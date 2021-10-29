'use strict';
const {
  Model
} = require('sequelize');

const emptyField = '0'.repeat(100);

module.exports = (sequelize, DataTypes) => {
  class UsersGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UsersGame.init({
    playerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    gameId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    field: {
      defaultValue: emptyField,
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'UsersGame',
  });
  return UsersGame;
};