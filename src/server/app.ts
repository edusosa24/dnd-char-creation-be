import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnect } from '../configuration/mongoConfig';
import { characterRoutes, userRoutes, loginRoutes } from '../routes/routes';
import loggers from '../utils/loggers';
import { errorHandler } from '../utils/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
dbConnect().catch((error) => {});

app.use('/api/characters', characterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

app.use(errorHandler);

export default app;
