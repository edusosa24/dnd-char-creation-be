import { Router } from 'express';
import userControllers from '../controllers/userControllers';
import userValidator from '../utils/middlewares/validators/userValidator';
import credentialsValidator from '../utils/middlewares/validators/credentialsValidator';

export const userRoutes = Router();

userRoutes.get(
  '/',
  credentialsValidator.validateAdmin,
  userControllers.getAllUsers
);
userRoutes.get(
  '/:userId',
  userValidator.validateUserExistance,
  credentialsValidator.validateCredentials,
  userControllers.getUser
);
userRoutes.post(
  '/',
  userValidator.validateUserCreate,
  userControllers.postUser
);
userRoutes.delete(
  '/:userId',
  userValidator.validateUserExistance,
  credentialsValidator.validateCredentials,
  userControllers.deleteUser
);

export default { userRoutes };
