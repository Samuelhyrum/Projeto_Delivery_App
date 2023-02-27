import SaleProduct from './SaleProduct';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING(200),
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'products',
    });
  
    Product.belongsToMany(Sale, { through: SaleProduct, foreignKey: 'product_id' });
  
    return Product;
  };