import { z } from "zod";

const userSchema = z
  .object({
    firstName: z
      .string({
        required_error: "first name is required",
        invalid_type_error: "first name must be string",
      })
      .min(1, "firstname should be at least of 1 character"),

    lastName: z
      .string({
        required_error: "second name is required",
        invalid_type_error: "second name must be string",
      })
      .min(1, "lastname should be at least of 1 character"),

    age: z.number({
      required_error: "age must be entered",
      invalid_type_error: "age should be number",
    }),

    email: z
      .string({
        required_error: "email must be required",
        invalid_type_error: "email must be string",
      })
      .email("Invalid email format"),

    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password must be string",
      })
      .min(5, "password must be at least 5 character")
      .max(12, "password can't be more than 12 character")
      .regex(
        new RegExp(".*[A-Z].*"),
        "password must contain at least one uppercase"
      )

      .regex(
        new RegExp(".*[a-z].*"),
        "password must contain at least one lowercase"
      )
      .regex(new RegExp(".*\\d.*"), "at least one number is needed"),

    confirmPassword: z.string({
      required_error: "confirm password is required",
      invalid_type_error: "confirm password must be string",
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    "password and confirm password doesn't match"
  );

export default userSchema;
