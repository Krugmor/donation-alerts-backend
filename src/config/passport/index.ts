import passport from "passport";
import signinStrategy from "./strategies/signin-strategy";
import signupStrategy from "./strategies/signup-strategy";
import jwtStrategy from "./strategies/jwt-strategy";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

passport.use("signup", signupStrategy);

passport.use("signin", signinStrategy);

passport.use("jwt", jwtStrategy);

export default passport;
