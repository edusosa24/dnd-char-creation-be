import { Character } from '../models/character';
import { Character as iCharacter } from '../utils/interfaces/iCharacter';

const getAll = async () => {
  const data = await Character.find().catch((err) => {
    throw err;
  });

  return data;
};

const getFromUser = async (userId: string) => {
  const data = await Character.find({ user: userId }).catch((err) => {
    throw err;
  });

  return data;
};

const getOne = async (characterId: string) => {
  const data = await Character.findOne({ id: characterId }).catch((err) => {
    throw err;
  });

  return data;
};

const createOne = async (character: iCharacter) => {
  const newCharacter = new Character(character);
  const data = await newCharacter.save().catch((err) => {
    throw err;
  });

  return data;
};

const updateOne = async (character: iCharacter, characterId: string) => {
  const newCharacter = new Character(character);
  const data = await Character.findOneAndUpdate(
    { id: characterId },
    newCharacter
  ).catch((err) => {
    throw err;
  });

  return data;
};

const deleteOne = async (characterId: string) => {
  const data = await Character.findOneAndDelete({ id: characterId }).catch(
    (err) => {
      throw err;
    }
  );

  return data;
};

export default { getAll, getFromUser, getOne, createOne, updateOne, deleteOne };
