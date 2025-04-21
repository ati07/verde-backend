import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProject, deleteProject, getProject, updateProject } from "../controllers/project.js";

const ProjectRouter = Router();
// auth,
ProjectRouter.post('/', auth, createProject);
ProjectRouter.get('/', auth, getProject);
ProjectRouter.patch('/:projectId', auth,deleteProject);
ProjectRouter.put('/:projectId', auth, updateProject);

export default ProjectRouter;