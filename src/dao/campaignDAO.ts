import { Campaign } from './../models/campaign';
import { Character } from '../models/character';
import { User } from '../models/user';
import { Campaign as iCampaign } from '../utils/interfaces/iCampaign';

export const getAllCampaigns = async () => {
  const data = await Campaign.find().catch((err) => {
    throw err;
  });

  return data;
};

export const getCampaignsFromUser = async (userId: string) => {
  const data = await Campaign.find(
    { master: userId },
    'id name characters'
  ).catch((err) => {
    throw err;
  });

  return data;
};

export const getCampaign = async (campaignId: string) => {
  const data = await Campaign.findOne({ _id: campaignId })
    .populate(
      'characters',
      'id general.player general.name general.class general.level general.race'
    )
    .catch((err) => {
      throw err;
    });

  if (!data) {
    throw new Error('campaign not found');
  }

  return data;
};

export const createCampaign = async (campaign: iCampaign) => {
  try {
    const newCampaign = new Campaign(campaign);
    const user = await User.findById({ _id: newCampaign.master });
    const data = await newCampaign.save();

    if (!data) {
      throw new Error('campaign could not be created');
    }

    user!.campaigns = user!.campaigns.concat(newCampaign._id);
    await user?.save();

    return data;
  } catch (err) {
    throw err;
  }
};

export const updateCampaign = async (
  campaign: iCampaign,
  campaignId: string
) => {
  const updatedCampaign = await Campaign.findOne({ _id: campaignId });
  let characters: any[] = [];

  for (const character of campaign.characters) {
    const char = await Character.findById({ _id: character }).catch((err) => {
      throw new Error('Invalid characters id');
    });
    if (!char) {
      throw new Error('Some characters not exists');
    }
    characters = characters.concat(char._id);
  }

  const data = await Campaign.findOneAndUpdate(
    { _id: campaignId },
    { name: campaign.name, characters },
    { new: true }
  )
    .populate(
      'characters',
      'id general.player general.name general.class general.level general.race'
    )
    .catch((err) => {
      throw err;
    });

  if (!data) {
    throw new Error('campaign could not be updated');
  }

  return data;
};

export const deleteCampaign = async (userId: string, campaignId: string) => {
  const user = await User.findById({ _id: userId }).catch((err) => {
    throw err;
  });

  user!.campaigns = user!.campaigns.filter(
    (campaign) => !campaign.equals(campaignId)
  );

  await User.findOneAndUpdate({ _id: userId }, { ...user }).catch((err) => {
    throw err;
  });

  await Campaign.findOneAndDelete({ _id: campaignId }).catch((err) => {
    throw err;
  });

  return;
};

export default {
  getAllCampaigns,
  getCampaignsFromUser,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign
};
