import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCategoryProject, deleteCategoryProject, getCategoryProject, updateCategoryProject } from "../controllers/categoryProject.js";

const CategoryProjectRouter = Router();
// auth,
CategoryProjectRouter.post('/',  createCategoryProject);
CategoryProjectRouter.get('/', auth, getCategoryProject);
CategoryProjectRouter.patch('/:categoryProjectId', auth,deleteCategoryProject);
CategoryProjectRouter.put('/:categoryProjectId', auth, updateCategoryProject);

export default CategoryProjectRouter;