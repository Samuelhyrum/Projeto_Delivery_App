const SaleProduct = require('./SaleProduct')


module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
      status: DataTypes.STRING(50),
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'sales',
    });
  
    // Sale.belongsTo(User, { foreignKey: 'user_id' });
    // Sale.belongsTo(User, { foreignKey: 'seller_id' });
    // Sale.belongsToMany(Product, { through: SaleProduct, foreignKey: 'sale_id' });

    Sale.associate = (models) => {
      Sale.belongsTo(models.User,
        { foreignKey: 'userId', as: 'user' });
      Sale.belongsTo(models.User,
        { foreignKey: 'sellerId', as: 'seller' });
      Sale.hasMany(models.SaleProduct,
        {foreignKey: 'saleId', as: 'sales'});
    };
  
    return Sale;
  };