import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderNo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
  }
}
