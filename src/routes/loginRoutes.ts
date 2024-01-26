import { Router } from 'express';
import loginControllers from '../controllers/loginControllers';
import { validateUserLogin } from '../utils/middlewares/validators/userValidator';

export const loginRoutes = Router();

loginRoutes.post('/', validateUserLogin, loginControllers.login);

export default { loginRoutes };
