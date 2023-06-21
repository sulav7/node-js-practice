import express from "express";
import userRouter from "../users/userRouter";

const router = express.Router();

router.use("/user", userRouter);

export default router;
