import { Router } from 'express';

import {
  createRdrAlerts,
  deleteRdrAlerts,
  filterRdrAlerts,
  getRdrAlerts,
  updateRdrAlerts,
} from '../controllers/rdrAlerts.js';
import auth from '../middleware/auth.js';

const rdrAlertsRouter = Router();

rdrAlertsRouter.post('/', auth, createRdrAlerts);
rdrAlertsRouter.post('/filter', auth, filterRdrAlerts);
rdrAlertsRouter.get('/', auth, getRdrAlerts);
rdrAlertsRouter.patch('/:rdrId', auth, deleteRdrAlerts);
rdrAlertsRouter.put('/:rdrId', auth, updateRdrAlerts);

export default rdrAlertsRouter;
