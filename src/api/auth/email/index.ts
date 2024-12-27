import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signUpSchema } from "../../../schema";
import AuthUtil from "../../../utils/auth";
import { Bindings } from "../../../types/bindings.types";

const app = new Hono<{ Bindings: Bindings }>();

app.post(
  "/sign-up-with-password",
  zValidator("json", signUpSchema),
  async (c) => {
    // Body is automatically validated and typed
    const { email, password, name } = c.req.valid("json");

    const auth = new AuthUtil(c.env.DB);

    const isUserExists = await auth.checkUserExists(email);
    if (isUserExists) {
      return c.json({
        success: false,
        message: "User already exists",
      }, 400);
    }

    await auth.signUpWithPassword({ email, password });

    await auth.createUser({ email, name });

    return c.json({
      success: true,
      message: "User signed up successfully",
    });
  }
);

export const EmailRoute = app;
