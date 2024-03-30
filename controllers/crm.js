import Crm from "../models/crm.js";
import tryCatch from "./utils/tryCatch.js";
import fs from 'fs';


export const createCrm = tryCatch(async (req, res) => {
  let crmPayload = req.body
  crmPayload.addedBy = req.auth.user._id

  const newCrm = new Crm(crmPayload);

  await newCrm.save()
  res.status(200).json({ success: true, message: 'CRM added successfully' });
})

export const getCrm = tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }
  const crm = await Crm.find(findData).sort({ _id: -1 });

  res.status(200).json({ success: true, result: crm });
});

export const deleteCrm = tryCatch(async (req, res) => {
  let updateData = {
    $set: { isDelete: true }
  }
  let findCrm = {
    _id: req.params.crmId
  }
  const c = await Crm.updateOne(findCrm, updateData);


  //Delete File

  const crm = await Crm.find(findCrm).sort({ _id: -1 });
  // console.log(crm);
  const fileName = crm?.[0]?.contractFile?.[0].file;
  const directoryPath = "./files/";

  if(fileName && fileName !==''){
    fs.unlink(directoryPath + fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not delete the file. " + err,
        });
      }
      // console.log("File is deleted.");
    });
  }
  
  res.status(200).json({ success: true, message: 'CRM and all the related data deleted successfully' });

})


export const updateCrm = tryCatch(async (req, res) => {

  let updateData = {
    $set: req.body
  }
  let findCrm = {
    _id: req.params.crmId
  }
  const updatedCrm = await Crm.updateOne(findCrm, updateData)
  let message = 'CRM edited successfully'

  res.status(200).json({ success: true, message: message })
});