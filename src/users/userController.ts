import express from "express";
import { userService } from ".";
import { IUser } from "./user";

class UserController {
  async get(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const userData = await userService.getOne(id);
      return res.status(200).json({
        message: "user data found",
        statusCode: 200,
        result: userData,
      });
    } catch (err: any) {
      return res.status(err.code).json({
        message: "user not found",
      });
    }
  }

  async create(req: express.Request, res: express.Response) {
    try {
      const body: IUser = req.body;
      const createdUser = await userService.createUser(body);
      return res.status(200).json({
        message: "user created successfully",
        statusCode: 200,
        result: createdUser,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(err.code).json({
        message: err.message,
      });
    }
  }

  async deleteUser(req: express.Request, res: express.Response) {
    try {
      const id = req.params.id;
      const deleteUser = await userService.deleteUser(id);
      return res.status(200).json({
        message: "user deleted",
        statusCode: 200,
        result: deleteUser,
      });
    } catch (err: any) {
      return res.status(err.code).json({
        message: err.message,
      });
    }
  }

  async updateUser(req: express.Request, res: express.Response) {
    try {
      const body = req.body;
      const id = req.params.id;
      const updatedUser = await userService.updateUserInfo(body, id);
      return res.status(200).json({
        message: "user info updated",
        statusCode: 200,
        result: updatedUser,
      });
    } catch (err: any) {
      return res.status(err.code).json({
        message: err.message,
      });
    }
  }

  async findAllUsers(req: express.Request, res: express.Response) {
    try {
      const filters = req.query;
      const users = await userService.getAllUser(filters);
      return res.status(200).json({
        message: "user displayed",
        statusCode: 200,
        result: users,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async findByAge(req: express.Request, res: express.Response) {
    try {
      const filter = req.query;
      const user = await userService.findByAge(filter);

      return res.status(200).json({
        message: "used info displayed",
        statusCode: 200,
        result: user,
      });
    } catch (err: any) {
      console.log(err);
      return res.status(err.status).json({
        message: err.message,
      });
    }
  }
}

export default UserController;
