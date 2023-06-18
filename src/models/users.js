import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
