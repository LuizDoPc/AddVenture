import { Model, DataTypes } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        document: DataTypes.STRING,
        user_type: DataTypes.INTEGER
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Adventure, { foreignKey: "user_id", as: "adventures" });
    this.hasMany(models.Subscription, {
      foreignKey: "user_id",
      as: "subscriptions"
    });
  }
}

module.exports = User;
