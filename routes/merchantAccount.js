import { Router } from 'express';

import {
  createMerchantAccount,
  deleteMerchantAccount,
  filterMerchantAccount,
  getMerchantAccount,
  updateMerchantAccount,
} from '../controllers/merchantAccount.js';
import auth from '../middleware/auth.js';

const merchantAccountRouter = Router();
merchantAccountRouter.get('/',auth, getMerchantAccount);
merchantAccountRouter.get('/:clientId',auth, getMerchantAccount);
merchantAccountRouter.post('/', auth,createMerchantAccount);
merchantAccountRouter.post('/filter',auth, filterMerchantAccount);
merchantAccountRouter.patch('/:merchantAccountId',auth,deleteMerchantAccount);
merchantAccountRouter.put('/:merchantAccountId',auth,updateMerchantAccount);

export default merchantAccountRouter;
