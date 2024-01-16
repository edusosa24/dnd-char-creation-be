import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { characterRoutes, userRoutes, loginRoutes } from '../routes/routes';

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/characters', characterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

export default app;
