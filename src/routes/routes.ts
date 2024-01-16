import { Router } from 'express';
// import characterControllers from '../controllers/characterControllers';
// import userControllers from '../controllers/userControllers';
// import loginControllers from '../controllers/loginControllers';
import {
  validateUser,
  validateCharacter,
  validateAdmin,
} from '../utils/middleware';

export const characterRoutes = Router();
export const userRoutes = Router();
export const loginRoutes = Router();

characterRoutes.get('/', validateAdmin, () => {});
characterRoutes.get('/:userId/characters/:id', () => {});
characterRoutes.get('/:userId/characters', () => {});
characterRoutes.post(
  '/:userId/characters',
  validateUser,
  validateCharacter,
  () => {}
);
characterRoutes.put(
  '/:userId/characters/:id',
  validateUser,
  validateCharacter,
  () => {}
);
characterRoutes.delete(
  '/:userId/characters/:id',
  validateUser,
  validateCharacter,
  () => {}
);

userRoutes.post('/', () => {});
userRoutes.delete('/:id', () => {});

loginRoutes.post('/', () => {});

export default { characterRoutes, userRoutes, loginRoutes };
