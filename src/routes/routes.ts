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
import { characterValidator } from '../utils/middlewares/validators/characterValidator';

export const characterRoutes = Router();
export const userRoutes = Router();
export const loginRoutes = Router();

characterRoutes.get('/', characterControllers.getAllCharacters);
characterRoutes.get('/:userId', characterControllers.getCharacter);
/* characterRoutes.get(
  '/:userId/characters/:id',
  characterControllers.getCharacter
);*/

characterRoutes.get('/:userId/characters', characterControllers.getFromUser);
//characterRoutes.post('/:userId/characters', characterControllers.postCharacter);
characterRoutes.post(
  '/',
  characterValidator,
  characterControllers.postCharacter
);

characterRoutes.put(
  '/:userId/character/:id',
  characterControllers.putCharacter
);
characterRoutes.delete(
  '/:userId/character/:id',
  characterControllers.deleteCharacter
);

/*
userRoutes.post('/', () => {});
userRoutes.delete('/:id', () => {});

loginRoutes.post('/', () => {});
*/
export default { characterRoutes, userRoutes, loginRoutes };
