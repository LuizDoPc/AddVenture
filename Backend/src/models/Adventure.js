import { Model, DataTypes } from "sequelize";

class Adventure extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        date: DataTypes.STRING,
        location: DataTypes.STRING,
        description: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = Adventure;
