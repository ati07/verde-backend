import { Router } from 'express';

import {
  createEthocaAlerts,
  deleteEthocaAlerts,
  filterEthocaAlerts,
  getEthocaAlerts,
  updateEthocaAlerts,
} from '../controllers/ethocaAlerts.js';
import auth from '../middleware/auth.js';

const ethocaAlertsRouter = Router();

ethocaAlertsRouter.post('/', auth, createEthocaAlerts);
ethocaAlertsRouter.post('/filter/', auth, filterEthocaAlerts);
ethocaAlertsRouter.get('/', auth, getEthocaAlerts);
ethocaAlertsRouter.patch('/:ethocaId', auth, deleteEthocaAlerts);
ethocaAlertsRouter.put('/:ethocaId', auth, updateEthocaAlerts);

export default ethocaAlertsRouter;
