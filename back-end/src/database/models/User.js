module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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

    User.associate = (models) => {
      User.hasMany(models.Sale,
        { foreignKey: 'userId', as: 'user' });
      User.hasMany(models.Sale,
        { foreignKey: 'sellerId', as: 'seller' });
    }
  
    return User;
  };