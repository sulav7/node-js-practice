import express from "express";
import { userController, userService } from ".";
import validate from "../utils/helpers/validationHelper";
import userSchema from "./userValidation";

const userRouter = express.Router();
userRouter.get("/filter", userController.findByAge);
userRouter.get("/:id", userController.get);
userRouter.get("/", userController.findAllUsers);
// userRouter.get("/paginate", userController.pagination);
userRouter.post("/", validate(userSchema), userController.create);
// userRouter.patch("/:id", validate(userSchema), userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/verify/:token", userController.verify);
userRouter.post("/forgotPassword/:resetToken", userController.forgotPassword);

export default userRouter;
