import { DonationModel, IDonationModel } from "../models/donation";

export const getDonation = async (id: number) => {
  return await DonationModel.findOne({ where: { id } });
};

export const getUserActiveDonation = async (userId: number) => {
  return await DonationModel.findOne({
    where: { userId },
    order: [["id", "DESC"]],
  });
};

export const createDonation = async (donation: IDonationModel) => {
  return await DonationModel.create(donation);
};

export const updateDonation = async (
  id: number,
  donation: Partial<IDonationModel>
) => {
  return await DonationModel.update(donation, {
    where: { id },
    individualHooks: true,
  });
};

export const getUserDonations = async (userId: number) => {
  return await DonationModel.findAll({
    where: { userId },
  });
};
