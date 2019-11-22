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
}

module.exports = User;
