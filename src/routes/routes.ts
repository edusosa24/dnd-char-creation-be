import { Router } from 'express';
import characterControllers from '../controllers/characterControllers';
import campaignControllers from '../controllers/campaignControllers';
import userControllers from '../controllers/userControllers';
import loginControllers from '../controllers/loginControllers';
import { validateCharacter } from '../utils/middlewares/validators/characterValidator';
import { validateCredentials } from '../utils/middlewares/validators/credentialsValidator';
import {
  validateAdmin,
  validateUserCreate,
  validateUserLogin
} from '../utils/middlewares/validators/userValidator';
import {
  validateCampaignCreate,
  validateCampaignUpdate
} from '../utils/middlewares/validators/campaignValidator';

export const characterRoutes = Router();
export const campaignRoutes = Router();
export const userRoutes = Router();
export const loginRoutes = Router();

characterRoutes.get('/', validateAdmin, characterControllers.getAllCharacters);
characterRoutes.get('/:characterId', characterControllers.getCharacter);
characterRoutes.get(
  '/user/:userId',
  validateCredentials,
  characterControllers.getFromUser
);
characterRoutes.post(
  '/user/:userId',
  validateCredentials,
  validateCharacter,
  characterControllers.postCharacter
);
characterRoutes.put(
  '/user/:userId/character/:characterId',
  validateCredentials,
  validateCharacter,
  characterControllers.putCharacter
);
characterRoutes.delete(
  '/user/:userId/character/:characterId',
  validateCredentials,
  characterControllers.deleteCharacter
);

campaignRoutes.get('/', validateAdmin, campaignControllers.getAllCampaigns);
campaignRoutes.get('/:campaignId', campaignControllers.getCampaign);
campaignRoutes.get('/user/:userId', campaignControllers.getFromUser);
campaignRoutes.post(
  '/user/:userId',
  validateCredentials,
  validateCampaignCreate,
  campaignControllers.postCampaign
);
campaignRoutes.put(
  '/user/:userId/campaign/:campaignId',
  validateCredentials,
  validateCampaignUpdate,
  campaignControllers.putCampaign
);
campaignRoutes.delete(
  '/user/:userId/campaign/:campaignId',
  validateCredentials,
  campaignControllers.deleteCampaign
);

userRoutes.get('/', validateAdmin, userControllers.getAllUsers);
userRoutes.get('/:userId', validateCredentials, userControllers.getUser);
userRoutes.post('/', validateUserCreate, userControllers.postUser);
userRoutes.delete('/:userId', validateCredentials, userControllers.deleteUser);

loginRoutes.post('/', validateUserLogin, loginControllers.login);

export default { characterRoutes, campaignRoutes, userRoutes, loginRoutes };
