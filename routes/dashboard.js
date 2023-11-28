import { Router } from 'express';

import {
    getAlertsAmounts, getDashboardDataNew
} from '../controllers/dashboard.js';
import auth from '../middleware/auth.js';


const dashboardRouter = Router();

dashboardRouter.get('/new', auth, getDashboardDataNew);
dashboardRouter.get('/amounts', auth, getAlertsAmounts)

export default dashboardRouter;