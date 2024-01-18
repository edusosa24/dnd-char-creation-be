import { Router } from 'express';
import characterControllers from '../controllers/characterControllers';
// import userControllers from '../controllers/userControllers';
// import loginControllers from '../controllers/loginControllers';
/*
import {
  validateUser,
  validateCharacter,
  validateAdmin,
} from '../utils/middleware';
*/
export const characterRoutes = Router();
export const userRoutes = Router();
export const loginRoutes = Router();

characterRoutes.get('/', characterControllers.getAllCharacters);
characterRoutes.get('/:id', characterControllers.getCharacter);
/* characterRoutes.get(
  '/:userId/characters/:id',
  characterControllers.getCharacter
);*/

characterRoutes.get('/:userId/characters', characterControllers.getAllFromUser);
//characterRoutes.post('/:userId/characters', characterControllers.postCharacter);
characterRoutes.post('/', characterControllers.postCharacter);
/*
characterRoutes.put(
  '/:userId/characters/:id',
  characterControllers.putCharacter
);
characterRoutes.delete(
  '/:userId/characters/:id',
  characterControllers.deleteCharacter
);

userRoutes.post('/', () => {});
userRoutes.delete('/:id', () => {});

loginRoutes.post('/', () => {});
*/
export default { characterRoutes, userRoutes, loginRoutes };
