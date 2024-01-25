import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

export const checkPassword = async (password: string, hashPassword: string) => {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};

export default { encryptPassword, checkPassword };
