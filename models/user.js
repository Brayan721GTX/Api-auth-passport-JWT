'use strict';

const {Model} = require('sequelize');
const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    firstname: {type: DataTypes.STRING},
    lastname: DataTypes.STRING,
    ulr_avatar: DataTypes.STRING,
    banned: {type:DataTypes.BOOLEAN, defaultValue: false},
    mail_confirmed: {type:DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    const hashedPassword = md5(user.password);
    user.password = hashedPassword;
  });
  return User;
};

