import { Router } from 'express';
import characterControllers from '../controllers/characterControllers';
import charValidator from '../utils/middlewares/validators/characterValidator';
import credentialsValidator from '../utils/middlewares/validators/credentialsValidator';
import { validateUserExistance } from '../utils/middlewares/validators/userValidator';

export const characterRoutes = Router();

characterRoutes.get(
  '/',
  credentialsValidator.validateAdmin,
  characterControllers.getAllCharacters
);
characterRoutes.get(
  '/:characterId',
  charValidator.validateCharacterExistance,
  characterControllers.getCharacter
);
characterRoutes.get(
  '/user/:userId',
  validateUserExistance,
  characterControllers.getFromUser
);
characterRoutes.post(
  '/user/:userId',
  validateUserExistance,
  credentialsValidator.validateCredentials,
  charValidator.validateCharacter,
  characterControllers.postCharacter
);
characterRoutes.put(
  '/user/:userId/character/:characterId',
  validateUserExistance,
  credentialsValidator.validateCredentials,
  charValidator.validateCharacterExistance,
  charValidator.validateCharacter,
  characterControllers.putCharacter
);
characterRoutes.delete(
  '/user/:userId/character/:characterId',
  validateUserExistance,
  credentialsValidator.validateCredentials,
  charValidator.validateCharacterExistance,
  characterControllers.deleteCharacter
);

export default { characterRoutes };
