import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCategoryInTheFlow, deleteCategoryInTheFlow, getCategoryInTheFlow, updateCategoryInTheFlow } from "../controllers/categoryInTheFlow.js";

const CategoryInTheFlowRouter = Router();

CategoryInTheFlowRouter.post('/', auth, createCategoryInTheFlow);
CategoryInTheFlowRouter.get('/', auth, getCategoryInTheFlow);
CategoryInTheFlowRouter.patch('/:categoryInTheFlowId', auth,deleteCategoryInTheFlow);
CategoryInTheFlowRouter.put('/:categoryInTheFlowId', auth, updateCategoryInTheFlow);

export default CategoryInTheFlowRouter;