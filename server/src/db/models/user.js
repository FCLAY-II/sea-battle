'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Game, Token, UsersGame, Invite }) {
      this.hasMany(Game, {
        foreignKey: 'currentPlayerId'
      });
      this.hasMany(Token, {
        foreignKey: 'userId'
      });
      this.belongsToMany(Game, {
        through: UsersGame,
        foreignKey: 'playerId'
      });
      this.belongsToMany(User, {
        through: Invite,
        foreignKey: 'hostId', 
        as: 'Guest',
      });
      this.belongsToMany(User, {
        through: Invite,
        foreignKey: 'guestId', 
        as: 'Host',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
