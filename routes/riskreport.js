import { Router } from 'express';

import {
    getRiskReport,
} from '../controllers/riskreport.js';
import auth from '../middleware/auth.js';

const riskReportRouter = Router();
riskReportRouter.get('/', auth, getRiskReport);
// dashboardRouter.get('/updatestatus',updateChargebackStatus)
export default riskReportRouter;