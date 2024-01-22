import { User } from '../models/user';
import { User as iUser } from '../utils/interfaces/iUser';

const getAll = async () => {
  const data = await User.find().catch((err) => {
    throw err;
  });

  return data;
};

const getById = async (userId: string) => {
  const data = await User.findById({ id: userId }).catch((err) => {
    throw err;
  });

  return data;
};

const getByUsername = async (username: string) => {
  const data = await User.findOne({ username }).catch((err) => {
    throw err;
  });

  return data;
};

const createOne = async (user: iUser) => {
  const newUser = new User(user);
  const data = await newUser.save().catch((err) => {
    throw err;
  });

  return data;
};

export default { getAll, getById, getByUsername, createOne };
