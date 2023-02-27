module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define('SaleProduct', {
      saleId: { type: DataTypes.INTEGER, primaryKey: true },
      productId: { type: DataTypes.INTEGER, primaryKey: true },
      quantity: { type: DataTypes.INTEGER},
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'sales_products',
    });
  
    return SaleProduct;
  };