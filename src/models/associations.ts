import {UserModel} from "./user";
import {DonationModel} from "./donation";

DonationModel.belongsTo(UserModel,{as: 'User', foreignKey: 'userId'});