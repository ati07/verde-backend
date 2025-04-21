import { Router } from "express";
import auth from "../middleware/auth.js";
import { createInventory, deleteInventory, getInventory, updateInventory } from "../controllers/inventory.js";

const inventoryRouter = Router();
// auth,
inventoryRouter.post('/', auth, createInventory);
inventoryRouter.get('/', auth, getInventory);
inventoryRouter.patch('/:inventoryId', auth,deleteInventory);
inventoryRouter.put('/:inventoryId', auth, updateInventory);

export default inventoryRouter;
