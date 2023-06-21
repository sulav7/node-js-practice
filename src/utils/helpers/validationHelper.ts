import { ZodSchema } from "zod";
import { Request, Response, NextFunction, response } from "express";
import { validateError } from "./responseHelper";

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;
      next();
    } catch (err: any) {
      return res.status(422).json({
        message: "validation error",
        error: validateError(err),
        status: response.statusCode,
      });
    }
  };

export default validate;
