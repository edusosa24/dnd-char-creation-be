import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/loggers';
import campaignDAO from '../dao/campaignDAO';

// GET CONTROLLERS

const getAllCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await campaignDAO.getAll();
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getFromUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await campaignDAO.getFromUser(req.params.userId);
    return res.status(200).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

const getCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await campaignDAO.getOne(req.params.characterId);
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
    const response = await campaignDAO.createOne(req.body);
    return res.status(201).send(response).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};

/*

// PUT CONTROLLERS

const putCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await campaignDAO.updateOne(
      req.body,
      req.params.characterId
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
    await campaignDAO.getFromUser(req.params.characterId);
    return res.status(204).end();
  } catch (err) {
    errorLog(err);
    next(err);
  }
};
*/

export default {
  getAllCampaigns,
  getCampaign,
  getFromUser,
  postCampaign
  //putCampaign,
  //deleteCampaign
};
