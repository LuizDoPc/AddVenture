import { Model, DataTypes } from "sequelize";

class AdventureType extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Subscription, {
      foreignKey: "adventure_type_id",
      as: "subscriptions"
    });
  }
}

module.exports = AdventureType;
