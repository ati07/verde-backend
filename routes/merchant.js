import { Router } from 'express';

import {
  createMerchant,
  deleteMerchant,
  getMerchant,
  updateMerchant,
} from '../controllers/merchant.js';
import auth from '../middleware/auth.js';

const merchantRouter = Router();
merchantRouter.post('/', auth,createMerchant);
merchantRouter.get('/', getMerchant);
merchantRouter.get('/:clientId', getMerchant);
merchantRouter.delete('/:merchantId',auth, deleteMerchant);
merchantRouter.put('/:merchantId', auth, updateMerchant);

export default merchantRouter;
