import { Request, Response, NextFunction } from 'express';
import campaignDao from '../dao/campaignDAO';
import { Campaign as iCampaign } from '../utils/interfaces/iCampaign';
import { errorLog } from '../utils/loggers';

// GET CONTROLLERS

const getAllCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await campaignDao.getAllCampaigns();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await campaignDao.getCampaignsFromUser(req.params.userId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await campaignDao.getCampaign(req.params.campaignId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

// POST CONTROLLERS

const postCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const campaign: iCampaign = {
      name: req.body.name,
      characters: [],
      master: req.params.userId
    };
    const response = await campaignDao.createCampaign(campaign);
    return res.status(201).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

// PUT CONTROLLERS

const putCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const campaign: iCampaign = {
      ...req.body
    };
    const response = await campaignDao.updateCampaign(
      campaign,
      req.params.campaignId
    );
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

// DELETE CONTROLLERS

const deleteCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, campaignId } = req.params;
    await campaignDao.deleteCampaign(userId, campaignId);
    return res.status(204).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

export default {
  getAllCampaigns,
  getCampaign,
  getFromUser,
  postCampaign,
  putCampaign,
  deleteCampaign
};
