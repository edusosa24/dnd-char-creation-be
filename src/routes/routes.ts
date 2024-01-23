import { Router } from 'express';
import characterControllers from '../controllers/characterControllers';
import userControllers from '../controllers/userControllers';
import loginControllers from '../controllers/loginControllers';
import { validateCharacter } from '../utils/middlewares/validators/characterValidator';
import { validateCredentials } from '../utils/middlewares/validators/credentialsValidator';
import {
  validateAdmin,
  validateUserCreate,
  validateUserLogin
} from '../utils/middlewares/validators/userValidator';

export const characterRoutes = Router();
export const userRoutes = Router();
export const loginRoutes = Router();

characterRoutes.get('/', validateAdmin, characterControllers.getAllCharacters);
characterRoutes.get('/:id', characterControllers.getCharacter);
characterRoutes.get('/user/:userId', characterControllers.getFromUser);
characterRoutes.post(
  '/user/:userId',
  validateCredentials,
  validateCharacter,
  characterControllers.postCharacter
);
characterRoutes.put(
  '/user/:userId/character/:id',
  validateCredentials,
  validateCharacter,
  characterControllers.putCharacter
);
characterRoutes.delete(
  '/user/:userId/character/:id',
  validateCredentials,
  characterControllers.deleteCharacter
);

userRoutes.get('/', validateAdmin, userControllers.getAllUsers);
userRoutes.get('/:id', validateCredentials, userControllers.getUser);
userRoutes.post('/', validateUserCreate, userControllers.postUser);

loginRoutes.post('/', validateUserLogin, loginControllers.login);

export default { characterRoutes, userRoutes, loginRoutes };
