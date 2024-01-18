require('dotenv').config();
import app from './server/app';
import env from './configuration/environment';
import { infoLog } from './utils/loggers';

app.listen(env.PORT, () => {
  infoLog(`Server running on port ${env.PORT}`);
});
