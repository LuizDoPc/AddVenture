import { Model, DataTypes } from "sequelize";

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.AdventureType, {
      foreignKey: "adventure_type_id",
      as: "adventure_type"
    });
    this.belongsTo(models.Adventure, {
      foreignKey: "adventure_id",
      as: "adventure"
    });
  }
}

module.exports = Subscription;
