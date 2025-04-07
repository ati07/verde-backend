import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCollectionReport, deleteCollectionReport, getCollectionReport, updateCollectionReport } from "../controllers/collectionReport.js";

const CollectionReportRouter = Router();

CollectionReportRouter.post('/', auth, createCollectionReport);
CollectionReportRouter.get('/', auth, getCollectionReport);
CollectionReportRouter.patch('/:collectionReportId', auth,deleteCollectionReport);
CollectionReportRouter.put('/:collectionReportId', auth, updateCollectionReport);

export default CollectionReportRouter;