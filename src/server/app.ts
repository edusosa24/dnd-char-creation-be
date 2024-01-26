import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnect } from '../configuration/mongoConfig';
import { characterRoutes } from '../routes/characterRoutes';
import { campaignRoutes } from '../routes/campaignRoutes';
import { userRoutes } from '../routes/userRoutes';
import { loginRoutes } from '../routes/loginRoutes';

import { errorHandler } from '../utils/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
dbConnect();

app.use('/api/characters', characterRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

app.use(errorHandler);

export default app;
