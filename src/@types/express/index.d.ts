import { IUserModel } from "../../models/user";

export {};

declare global {
  namespace Express {
    interface User extends IUserModel {}
  }
}
