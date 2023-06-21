import { Repository } from "sequelize-typescript";
import { bcryptPassword } from "../utils/helpers/becryptHelper";

import { IUser } from "./user";

class UserService {
  private _userModel;

  constructor(model: Repository<IUser>) {
    this._userModel = model;
  }

  async getOne(id: string): Promise<IUser> {
    const user = await this._userModel.findByPk(id);
    if (!user) {
      throw {
        code: 404,
        message: "user not found",
      };
    }

    return user;
  }

  async createUser(body: IUser): Promise<IUser> {
    //@ts-ignore
    delete body.confirmPassword;
    const checkUser = await this._userModel.findOne({
      where: { email: body.email },
    });
    if (checkUser) {
      throw {
        code: 422,
        message: "Email already in use",
      };
    }
    const password = body.password;
    const hashedPassword = await bcryptPassword(password);

    const createuser = await this._userModel.create({
      ...body,
      password: hashedPassword,
    });
    return createuser;
  }

  async deleteUser(id: string): Promise<number> {
    const deleteUser = await this._userModel.destroy({
      where: {
        id: id,
      },
    });
    return deleteUser;
  }
  //   DELETE FROM CUSTOMERS
  // WHERE ID = 6;

  //   UPDATE CUSTOMERS
  // SET ADDRESS = 'Pune'
  // WHERE ID = 6;

  async getUserByEmail(email: string) {
    const userEmail = await this._userModel.findOne({
      where: {
        email: email,
      },
    });
    return userEmail;
  }

  async updateUserInfo(
    body: IUser,
    id: string
  ): Promise<[affectedCount: number, affectedRows: IUser[]]> {
    const checkUser = await this.getUserByEmail(body.email);
    if (checkUser) {
      throw {
        message: "email already taken",
        code: 422,
      };
    }
    const updateUser = await this._userModel.update(body, {
      where: {
        id: id,
      },
      returning: true,
    });
    return updateUser;
  }

  async getAllUser(filters: any): Promise<IUser[]> {
    const users = await this._userModel.findAll({
      where: {},
    });
    return users;
  }

  async findByAge(filter: any) {
    const user = await this._userModel.findAll({
      where: {
        age: filter.age,
      },
    });
    return user;
  }
}
export default UserService;
