import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class itemProduct extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'cart',
        key: 'cartId'
      }
    },
    prodId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'product',
        key: 'prodId'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subTotal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    }
  }, {
    sequelize,
    tableName: 'itemProduct',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "itemProduct_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
