import { Router } from 'express';
import auth from '../middleware/auth.js';
import { midgatorApi } from '../API Integration/Midigator Integration/midigatorApi.js';


const apiRouter = Router();

apiRouter.post('/midigator-ethoca-alerts', midgatorApi);

export default apiRouter;
