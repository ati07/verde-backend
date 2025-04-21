import { Router } from 'express';

import { createClient, deleteClient, getClient, updateClient } from '../controllers/client.js';
import auth from '../middleware/auth.js';
import authenticateRoles from '../middleware/authenticateRole.js';

const allowedRoles = ["Admin", "Super Admin","Partner", "CRM_Admin"]

const clientRouter = Router();
// auth, authenticateRoles(allowedRoles),
clientRouter.post('/', auth, authenticateRoles(allowedRoles), createClient);
clientRouter.get('/', auth, authenticateRoles(allowedRoles), getClient);
clientRouter.patch('/:clientId', auth, authenticateRoles(allowedRoles), deleteClient);
clientRouter.put('/:clientId', auth, authenticateRoles(allowedRoles), updateClient);

export default clientRouter;