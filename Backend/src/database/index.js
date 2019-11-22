import Sequelize from "sequelize";
import dbConfig from "../config/database";

import User from "../models/User";
import Adventure from "../models/Adventure";
import AdventureType from "../models/AdventureType";
import Subscription from "../models/Subscription";

const connection = new Sequelize(dbConfig);

User.init(connection);
AdventureType.init(connection);
Adventure.init(connection);
Subscription.init(connection);

Adventure.associate(connection.models);
Subscription.associate(connection.models);

module.exports = connection;
