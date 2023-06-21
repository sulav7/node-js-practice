import sequelize from "../setup/databaseSetup";
import User from "./user";

import UserController from "./userController";
import UserService from "./userService";

const userRepo = sequelize.getRepository(User);

const userService = new UserService(userRepo);
const userController = new UserController();

export { userService, userController };
