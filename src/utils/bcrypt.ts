import bcrypt from 'bcrypt';

const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

const checkPassword = async (password: string, hashPassword: string) => {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
};

export default { encryptPassword, checkPassword };
