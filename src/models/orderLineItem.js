import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orderLineItem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ordLineId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    orderId: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orderLineItem',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orderLineItem_pkey",
        unique: true,
        fields: [
          { name: "ordLineId" },
        ]
      },
    ]
  });
  }
}
