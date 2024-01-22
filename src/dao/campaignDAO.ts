import { Campaign } from './../models/campaign';
import { Campaign as iCampaign } from '../utils/interfaces/iCampaign';

const getAll = async () => {
  const data = await Campaign.find().catch((err) => {
    throw err;
  });

  return data;
};

const getFromUser = async (userId: string) => {
  const data = await Campaign.find({ master: userId }).catch((err) => {
    throw err;
  });

  return data;
};

const getOne = async (campaignId: string) => {
  const data = await Campaign.findOne({ id: campaignId }).catch((err) => {
    throw err;
  });

  return data;
};

const createOne = async (campaign: iCampaign) => {
  const newCampaign = new Campaign(campaign);
  const data = await newCampaign.save().catch((err) => {
    throw err;
  });

  return data;
};

const updateOne = async (campaign: iCampaign, campaignId: string) => {
  const newCampaign = new Campaign(campaign);
  const data = await Campaign.findOneAndUpdate(
    { id: campaignId },
    newCampaign
  ).catch((err) => {
    throw err;
  });

  return data;
};

const deleteOne = async (campaignId: string) => {
  const data = await Campaign.findOneAndDelete({ id: campaignId }).catch(
    (err) => {
      throw err;
    }
  );

  return data;
};

export default { getAll, getFromUser, getOne, createOne, updateOne, deleteOne };
