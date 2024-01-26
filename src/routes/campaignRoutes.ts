import { Router } from 'express';
import campaignControllers from '../controllers/campaignControllers';
import campaignValidator from '../utils/middlewares/validators/campaignValidator';
import credentialsValidator from '../utils/middlewares/validators/credentialsValidator';
import { validateUserExistance } from '../utils/middlewares/validators/userValidator';

export const campaignRoutes = Router();

campaignRoutes.get(
  '/',
  credentialsValidator.validateAdmin,
  campaignControllers.getAllCampaigns
);
campaignRoutes.get('/:campaignId', campaignControllers.getCampaign);
campaignRoutes.get(
  '/user/:userId',
  validateUserExistance,
  campaignValidator.validateCampaignExistance,
  campaignControllers.getFromUser
);
campaignRoutes.post(
  '/user/:userId',
  validateUserExistance,
  credentialsValidator.validateCredentials,
  campaignValidator.validateCampaignCreate,
  campaignControllers.postCampaign
);
campaignRoutes.put(
  '/user/:userId/campaign/:campaignId',
  validateUserExistance,
  credentialsValidator.validateCredentials,
  campaignValidator.validateCampaignExistance,
  campaignValidator.validateCampaignUpdate,
  campaignControllers.putCampaign
);
campaignRoutes.delete(
  '/user/:userId/campaign/:campaignId',
  validateUserExistance,
  credentialsValidator.validateCredentials,
  campaignValidator.validateCampaignExistance,
  campaignControllers.deleteCampaign
);

export default { campaignRoutes };
