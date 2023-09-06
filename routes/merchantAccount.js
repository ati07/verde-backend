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
merchantAccountRouter.post('/', auth,createMerchantAccount);
merchantAccountRouter.post('/filter',auth, filterMerchantAccount);
merchantAccountRouter.get('/',auth, getMerchantAccount);
merchantAccountRouter.delete('/:merchantAccountId',auth,deleteMerchantAccount);
merchantAccountRouter.put('/:merchantAccountId',auth,updateMerchantAccount);
merchantAccountRouter.patch('/status/:merchantAccountId',auth,updateMerchantAccount);

export default merchantAccountRouter;
