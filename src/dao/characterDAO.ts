import { Character } from '../models/character';
import { Character as iCharacter } from '../utils/interfaces/iCharacter';
import { User } from '../models/user';

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

  if (!data) {
    throw new Error('character not found');
  }

  return data;
};

export const createCharacter = async (character: iCharacter) => {
  try {
    const newCharacter = new Character(character);
    const user = await User.findById({ _id: newCharacter.user });
    const data = await newCharacter.save();

    if (!data) {
      throw new Error('character could not be created');
    }

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

  if (!data) {
    throw new Error('character could not be updated');
  }

  return data;
};

export const deleteCharacter = async (characterId: string) => {
  await Character.findOneAndDelete({ _id: characterId }).catch((err) => {
    throw err;
  });

  return;
};

export default {
  getAllCharacters,
  getCharactersFromUser,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter
};
