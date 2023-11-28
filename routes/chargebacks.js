import { Router } from 'express';

import {
  createChargebacks,
  deleteChargebacks,
  filterChargebacks,
  getChargebacks,
  insertManyChargebacks,
  updateChargebacks,
} from '../controllers/chargebacks.js';
import auth from '../middleware/auth.js';

const chargebacksRouter = Router();
chargebacksRouter.post('/', auth, createChargebacks);
chargebacksRouter.post('/filter/', auth, filterChargebacks);
chargebacksRouter.get('/', auth, getChargebacks);
chargebacksRouter.patch('/:chargebacksId', auth, deleteChargebacks);
chargebacksRouter.put('/:chargebacksId', auth, updateChargebacks);
chargebacksRouter.post('/insertmany', auth, insertManyChargebacks)

export default chargebacksRouter;
