import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
} from "../config/passport/strategies/jwt-strategy";

const router = Router();

router.post("/signin", async function (req, res, next) {
  passport.authenticate("signin", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const userPayload = { id: user.id, email: user.email };
        const token = jwt.sign({ user: userPayload }, JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRES_IN,
        });

        res.cookie("token", token, { httpOnly: true });

        return res.json({
          success: true,
          token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    const userPayload = { id: req.user!.id, email: req.user!.email };
    res.status(200).json({
      success: true,
      user: userPayload,
    });
  }
);

export { router as authRouter };
