import { Strategy as LocalStrategy } from "passport-local";
import { getUser, isValidPassword } from "../../../controllers/user";

export default new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await getUser({ email });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const validate = await isValidPassword(user, password);

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  }
);
