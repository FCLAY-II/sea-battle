'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, UsersGame }) {
      this.belongsTo(User, {
        foreignKey: 'currentPlayerId'
      });
      this.belongsToMany(User, {
        through: UsersGame,
        foreignKey: 'gameId'
      });
    }
  };
  Game.init({
    currentPlayerId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  },
     {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
