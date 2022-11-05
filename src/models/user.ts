import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../config/sequelize/database";

export interface IUserModel {
  id?: CreationOptional<number>;
  email: string;
  password: string;
}

interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    IUserModel {}

const UserModel = database.define<UserModel>("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  email: {
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export {UserModel};