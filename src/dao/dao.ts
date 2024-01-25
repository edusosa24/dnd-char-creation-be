import { Campaign } from './../models/campaign';
import { Character } from '../models/character';
import { User } from '../models/user';
import { Campaign as iCampaign } from '../utils/interfaces/iCampaign';
import { Character as iCharacter } from '../utils/interfaces/iCharacter';
import { User as iUser } from '../utils/interfaces/iUser';

/*                                          */
/*                   USERS                  */
/*                                          */
export const getAllUsers = async () => {
  const data = await User.find().catch((err) => {
    throw err;
  });

  return data;
};

export const getUsersById = async (userId: string) => {
  const data = await User.findById({ _id: userId }).catch((err) => {
    throw err;
  });

  return data;
};

export const getUsersByUsername = async (username: string) => {
  const data = await User.findOne({ username }).catch((err) => {
    throw err;
  });

  return data;
};

export const createUser = async (user: iUser) => {
  const newUser = new User(user);
  const data = await newUser.save().catch((err) => {
    throw err;
  });

  return data;
};

export const deleteUser = async (userId: string) => {
  try {
    const characters = await Character.find({ user: userId });
    const campaigns = await Campaign.find({ master: userId });
    characters.forEach(async (character) => {
      await Character.findOneAndDelete(character._id);
    });
    campaigns.forEach(async (campaign) => {
      await Campaign.findOneAndDelete(campaign._id);
    });
    await User.findByIdAndDelete({ _id: userId });

    return;
  } catch (err) {
    throw err;
  }
};

/*                                          */
/*                 CHARACTERS               */
/*                                          */
export const getAllCharacters = async () => {
  const data = await Character.find().catch((err) => {
    throw err;
  });

  return data;
};

export const getCharactersFromUser = async (userId: string) => {
  const data = await Character.find({ user: userId }).catch((err) => {
    throw err;
  });

  return data;
};

export const getCharacter = async (characterId: string) => {
  const data = await Character.findOne({ _id: characterId }).catch((err) => {
    throw err;
  });

  return data;
};

export const createCharacter = async (character: iCharacter) => {
  try {
    const newCharacter = new Character(character);
    const user = await User.findById({ _id: newCharacter.user });
    const data = await newCharacter.save();
    user!.characters = user!.characters.concat(newCharacter._id);
    await user?.save();

    return data;
  } catch (err) {
    throw err;
  }
};

export const updateCharacter = async (
  character: iCharacter,
  characterId: string
) => {
  const data = await Character.findOneAndUpdate(
    { _id: characterId },
    { ...character },
    { new: true }
  ).catch((err) => {
    throw err;
  });

  return data;
};

export const deleteCharacter = async (characterId: string) => {
  await Character.findOneAndDelete({ _id: characterId }).catch((err) => {
    throw err;
  });

  return;
};

/*                                          */
/*                  CAMPAIGNS               */
/*                                          */
export const getAllCampaigns = async () => {
  const data = await Campaign.find().catch((err) => {
    throw err;
  });

  return data;
};

export const getCampaignsFromUser = async (userId: string) => {
  const data = await Campaign.find({ master: userId }).catch((err) => {
    throw err;
  });

  return data;
};

export const getCampaign = async (campaignId: string) => {
  const data = await Campaign.findOne({ _id: campaignId }).catch((err) => {
    throw err;
  });

  return data;
};

export const createCampaign = async (campaign: iCampaign) => {
  try {
    const newCampaign = new Campaign(campaign);
    const user = await User.findById({ _id: newCampaign.master });
    const data = await newCampaign.save();
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
  if (!updatedCampaign) {
    throw new Error('Campaign not found');
  }

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
  ).catch((err) => {
    throw err;
  });

  return data;
};

export const deleteCampaign = async (campaignId: string) => {
  await Campaign.findOneAndDelete({ _id: campaignId }).catch((err) => {
    throw err;
  });

  return;
};
