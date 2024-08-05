'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    idUsers: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Task, {
      foreignKey: 'user_id',
      as: 'tasks'
    });
  };

  return User;
};
