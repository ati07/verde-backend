import { Router } from "express";
import { deleteFile, uploadFile } from "../controllers/uploadFile.js";
import multer from "multer";
import auth from '../middleware/auth.js';
import logUserAction from "../middleware/logUserAction.js";


const uploadFileRouter = Router();

//multer------------------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    // console.log('fileM',req,file)
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

uploadFileRouter.post("/",auth,logUserAction('uploaded a File'),upload.single("file"),uploadFile)
uploadFileRouter.post("/delete-file",auth,deleteFile)


export default uploadFileRouter;
