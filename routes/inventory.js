import { Router } from "express";
import auth from "../middleware/auth.js";
import { createInventory, deleteInventory, getInventory, updateInventory } from "../controllers/inventory.js";

const inventoryRouter = Router();
// auth,
inventoryRouter.post('/',  createInventory);
inventoryRouter.get('/', auth, getInventory);
inventoryRouter.patch('/:crmId', auth,deleteInventory);
inventoryRouter.put('/:crmId', auth, updateInventory);

export default inventoryRouter;
