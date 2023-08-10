import { Repository } from "sequelize-typescript";
import sendEmail from "../config/nodeMailer";
import transporter from "../config/nodeMailer";
import { bcryptPassword } from "../utils/helpers/becryptHelper";
import token from "../utils/helpers/tokenHelper";

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

    const createuser = await this._userModel.create(
      {
        ...body,
        password: hashedPassword,
        token: token(),
      },
      { raw: true }
    );
    sendEmail({
      from: "sulav niroula <sulavniroula@gmail.com>",
      to: `${createuser.email}`,
      subject: "welcome to our world",
      html: `http://localhost:8100/api/v1/user/verify/${createuser.token}`,
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
    if (!user) {
      throw {
        message: "user not found",
        code: 422,
      };
    }
    return user;
  }

  async paginateUser(limit: any, offset: any) {
    const pagination = await this._userModel.findAll({
      limit: limit,
      offset: offset,
    });

    return pagination;
  }

  async verifyUser(token: string) {
    const checkUser = await this._userModel.findOne({
      where: {
        token: token,
      },
    });
    if (!checkUser) {
      throw {
        message: "user not found",
        code: 404,
      };
    }
    await this._userModel.update(
      {
        verify: true,
      },
      {
        where: {
          id: checkUser.id,
        },
      }
    );
  }

  async forgotPassword(email: string, body: IUser) {
    const user = this._userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw {
        code: 404,
        message: "email not found",
      };
    }
    await this._userModel.update(
      { resetToken: token() },
      {
        where: { email: email },
      }
    );
    sendEmail({
      from: "sulav niroula <sulavniroula@gmail.com>",
      to: `${body.email}`,
      subject: "welcome to our world",
      html: `http://localhost:8100/api/v1/user/forgotPassword/${body.resetToken}`,
    });
  }
  async resetPassword(resetToken: string, body: IUser) {
    const checkUser = await this._userModel.findOne({ where: { resetToken } });
    if (!checkUser) {
      throw {
        code: 404,
        message: "email not found",
      };
    }
    const hashedPassword = await bcryptPassword(body.password);
    await this._userModel.update(
      { password: hashedPassword, resetToken: null },
      {
        where: {
          id: checkUser.id,
        },
      }
    );
  }
}
export default UserService;
