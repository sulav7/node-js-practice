import { ZodError } from "zod";

const validateError = (err: ZodError) => {
  const error: string[] = [];
  err.issues.map((e) => {
    error.push(e.message);
  });

  return error;
};
export { validateError };
