import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../config/sequelize/database";
import { UserModel } from "./user";

export interface IDonationModel {
  id?: CreationOptional<number>;
  userId: number;
  name: string;
  text: string;
  shown?: CreationOptional<boolean>;
}

interface DonationModel
  extends Model<
      InferAttributes<DonationModel>,
      InferCreationAttributes<DonationModel>
    >,
    IDonationModel {}

const DonationModel = database.define<DonationModel>("Donation", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  shown: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export { DonationModel };
