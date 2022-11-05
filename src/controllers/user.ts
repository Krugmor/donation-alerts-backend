import bcrypt from "bcrypt-nodejs";
import { IUserModel, UserModel } from "../models/user";

export const createUser = async ({ email, password }: IUserModel) => {
  let salt = bcrypt.genSaltSync();
  let hash = bcrypt.hashSync(password, salt);
  return await UserModel.create({ email, password: hash });
};

export const getUser = async (obj: Partial<IUserModel>) => {
  return await UserModel.findOne({
    where: obj,
  });
};

export const isValidPassword = async (user: IUserModel, password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      return resolve(result);
    });
  });
};
