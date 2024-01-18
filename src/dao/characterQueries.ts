/* eslint-disable */
import { Character } from '../models/character';
import { User } from '../models/user';

const getAll = async () => {
  const data = await Character.find().catch((error) => {
    throw error;
  });

  return data;
};

const getAllFromUser = async (userId: string) => {
  const data = await Character.find({ user: userId }).catch((error) => {
    throw error;
  });

  return data;
};

const getOne = async (characterId: string) => {
  const data = await Character.findOne({ id: characterId }).catch((error) => {
    throw error;
  });

  return data;
};

const createOne = async (character: any) => {
  const newCharacter = new Character(character);
  const data = await newCharacter.save().catch((error) => {
    throw error;
  });

  return data;
};

/*
const updateOne = async () => {
  const data = await Character.find().catch((error) => {
    throw error;
  });

  return data;
};

const deleteOne = async () => {
  const data = await Character.find().catch((error) => {
    throw error;
  });

  return data;
};
*/

export default { getAll, getAllFromUser, getOne, createOne };
