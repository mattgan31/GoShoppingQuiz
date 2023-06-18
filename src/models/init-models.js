import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _cart from  "./cart.js";
import _category from  "./category.js";
import _itemProduct from  "./itemProduct.js";
import _orderLineItem from  "./orderLineItem.js";
import _orders from  "./orders.js";
import _product from  "./product.js";
import _users from  "./users.js";

import Sequelize from "sequelize";
import config from "../config/config.js";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const initModels = (sequelize) => {
  const cart = _cart.init(sequelize, DataTypes);
  const category = _category.init(sequelize, DataTypes);
  const itemProduct = _itemProduct.init(sequelize, DataTypes);
  const orderLineItem = _orderLineItem.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const product = _product.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  itemProduct.belongsTo(cart, { as: "cart", foreignKey: "cartId"});
  cart.hasMany(itemProduct, { as: "itemProducts", foreignKey: "cartId"});
  product.belongsTo(category, { as: "cate", foreignKey: "cateId"});
  category.hasMany(product, { as: "products", foreignKey: "cateId"});
  itemProduct.belongsTo(product, { as: "prod", foreignKey: "prodId"});
  product.hasMany(itemProduct, { as: "itemProducts", foreignKey: "prodId"});
  orderLineItem.belongsTo(product, { as: "prod", foreignKey: "prodId"});
  product.hasMany(orderLineItem, { as: "orderLineItems", foreignKey: "prodId"});
  itemProduct.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(itemProduct, { as: "itemProducts", foreignKey: "userId"});
  orders.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(orders, { as: "orders", foreignKey: "userId"});

  return {
    cart,
    category,
    itemProduct,
    orderLineItem,
    orders,
    product,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };
