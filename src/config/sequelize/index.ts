import { Sequelize } from "sequelize";
import { DonationModel } from "../../models/donation";
import { UserModel } from "../../models/user";

export const initDatabase = (database: Sequelize) => {
  database
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("Database not connected", err));

  UserModel.sync()
    .then(() => console.log("User table created successfully"))
    .catch((err) => console.log("User table not created", err));
  DonationModel.sync()
    .then(() => console.log("Donation table created successfully"))
    .catch((err) => console.log("Donation table not created", err));
};
