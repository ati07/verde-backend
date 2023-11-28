import { Router } from 'express';

import {
  createMerchant,
  deleteMerchant,
  getMerchant,
  updateMerchant,
} from '../controllers/merchant.js';
import auth from '../middleware/auth.js';

const merchantRouter = Router();
merchantRouter.get('/', auth, getMerchant);
merchantRouter.get('/:clientId', auth, getMerchant);
merchantRouter.post('/', auth, createMerchant);
merchantRouter.patch('/:merchantId', auth, deleteMerchant);
merchantRouter.put('/:merchantId', auth, updateMerchant);

export default merchantRouter;
