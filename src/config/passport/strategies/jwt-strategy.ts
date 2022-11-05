import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "TOP_SECRET";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "30m";
// export const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "TOP_REFRESH_SECRET";
// export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "1d";

export default new JWTstrategy(
  {
    secretOrKey: JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
);
