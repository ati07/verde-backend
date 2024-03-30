import tryCatch from "./utils/tryCatch.js";
import fs from 'fs';

export const uploadFile = tryCatch(async (req, res) => {
    const title = req.body.title;
    const fileName = req.file.filename;

    if (req.body.oldFileName !== '') {
        const fileName = req.body.oldFileName;
        const directoryPath = "./files/";

        fs.unlink(directoryPath + fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        });
    }
    res.status(200).json({ success: true, result: { title, fileName } });

})

export const deleteFile = tryCatch(async (req, res) => {
    const fileName = req.body.file;
    const directoryPath = "./files/";

    if (fileName && fileName !== '') {
        fs.unlink(directoryPath + fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: "Could not delete the file. " + err,
                });
            }
        });
    }


    res.status(200).json({ success: true });
})