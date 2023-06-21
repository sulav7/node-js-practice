import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../config/databaseConfig";
import User from "../users/user";

const sequelize = new Sequelize({
  database: databaseConfig.database,
  dialect: "postgres",
  username: databaseConfig.username,
  password: databaseConfig.password,
  host: databaseConfig.host,
  repositoryMode: true,
  models: [User],
  logging: false,
});

export default sequelize;
