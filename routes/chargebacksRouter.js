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
import checkAccess from '../middleware/checkAccess.js';
// import chargebacksPermissions from '../middleware/permissions/chargebacks/chargebacksPermissions.js';
// auth,
const chargebacksRouter = Router();
chargebacksRouter.post('/', auth,createChargebacks);
chargebacksRouter.post('/filter/',auth, filterChargebacks);
chargebacksRouter.get('/', getChargebacks);
chargebacksRouter.delete(
  '/:chargebacksId',
  auth,
//   checkAccess(chargebacksPermissions.delete),
  deleteChargebacks
);
chargebacksRouter.put(
  '/:chargebacksId',
  auth,
//   checkAccess(chargebacksPermissions.update),
  updateChargebacks
);
// chargebacksRouter.post('/insertmany',auth,insertManyChargebacks)

export default chargebacksRouter;
