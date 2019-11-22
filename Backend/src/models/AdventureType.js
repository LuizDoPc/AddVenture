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
}

module.exports = AdventureType;
