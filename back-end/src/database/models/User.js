"use strict";
const User = (sequelize, DataTypes) => {
    const userTable = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'users',
    });
  
    // User.hasMany(Sale, { foreignKey: 'user_id' });
    // User.hasMany(Sale, { foreignKey: 'seller_id' });

    userTable.associate = (models) => {
      userTable.hasMany(models.Sale,
        { foreignKey: 'userId', as: 'user' },
        { foreignKey: 'sellerId', as: 'seller' },
      );
    }
  
    return userTable;
  };

  module.exports = User;