import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProvider, deleteProvider, getProvider, updateProvider } from "../controllers/provider.js";

const ProviderRouter = Router();
// auth,
ProviderRouter.post('/',  createProvider);
ProviderRouter.get('/', auth, getProvider);
ProviderRouter.patch('/:providerId', auth,deleteProvider);
ProviderRouter.put('/:providerId', auth, updateProvider);

export default ProviderRouter;