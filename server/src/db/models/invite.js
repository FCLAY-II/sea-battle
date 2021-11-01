'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invite extends Model {
   
    static associate(models) {
      // define association here
    }
  };
  Invite.init({
    hostId: DataTypes.INTEGER,
    guestId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invite',
  });
  return Invite;
};
