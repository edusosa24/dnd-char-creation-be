import { Campaign } from './../models/campaign';
import { Character } from '../models/character';
import { User } from '../models/user';
import { User as iUser } from '../utils/interfaces/iUser';

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

  if (!data) {
    throw new Error('user not found');
  }

  return data;
};

export const getUsersByUsername = async (username: string) => {
  const data = await User.findOne({ username }).catch((err) => {
    throw err;
  });

  if (!data) {
    throw new Error('user not found');
  }

  return data;
};

export const createUser = async (user: iUser) => {
  const newUser = new User(user);
  const data = await newUser.save().catch((err) => {
    throw err;
  });

  if (!data) {
    throw new Error('user could not be created');
  }

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

export default {
  getAllUsers,
  getUsersById,
  getUsersByUsername,
  createUser,
  deleteUser
};
