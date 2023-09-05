import { Router } from 'express';

import {
  createClient, deleteClient, getClient, updateClient
} from '../controllers/client.js';
import auth from '../middleware/auth.js';


const clientRouter = Router();
clientRouter.post('/', auth,createClient);
clientRouter.get('/', getClient);
clientRouter.delete('/:clientId',auth,deleteClient);
clientRouter.put('/:clientId',auth,updateClient);
clientRouter.patch('/status/:clientId', auth, updateClient);

export default clientRouter;