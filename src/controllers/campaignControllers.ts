import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import {
  getAllCampaigns as getAll,
  getCampaign as getOne,
  getCampaignsFromUser as getAllFromUser,
  createCampaign as createOne,
  deleteCampaign as deleteOne,
  updateCampaign as updateOne
} from '../dao/dao';
import { Campaign as iCampaign } from '../utils/interfaces/iCampaign';

// GET CONTROLLERS

const getAllCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getAll();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getAllFromUser(req.params.userId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getOne(req.params.campaignId);
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
    const response = await createOne(campaign);
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
    const response = await updateOne(campaign, req.params.campaignId);
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
    await deleteOne(req.params.campaignId);
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
