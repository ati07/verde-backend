import { Router } from 'express';

import { createClient, deleteClient, getClient, updateClient } from '../controllers/client.js';
import auth from '../middleware/auth.js';
import authenticateRoles from '../middleware/authenticateRole.js';

const allowedRoles = ["Admin", "Partner"]

const clientRouter = Router();

clientRouter.post('/', auth, authenticateRoles(allowedRoles), createClient);
clientRouter.get('/', auth, authenticateRoles(allowedRoles), getClient);
clientRouter.patch('/:clientId', auth, authenticateRoles(allowedRoles), deleteClient);
clientRouter.put('/:clientId', auth, authenticateRoles(allowedRoles), updateClient);

export default clientRouter;