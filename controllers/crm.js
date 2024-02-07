import Crm from "../models/crm.js";
import tryCatch from "./utils/tryCatch.js";


export const createCrm = tryCatch( async (req, res)=>{
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

export const deleteCrm = tryCatch(async(req, res)=>{
    let updateData = {
        $set: {isDelete:true}
      }
      let findCrm={
        _id: req.params.crmId
      }
      const c = await Crm.updateOne(findCrm,updateData);
  res.status(200).json({ success: true, message: 'CRM and all the related data deleted successfully' });

})


export const updateCrm = tryCatch(async (req, res) => {
  
    let updateData = {
      $set: req.body
    }
    let findCrm={
      _id: req.params.crmId
    }
    const updatedCrm = await Crm.updateOne(findCrm,updateData)
    let message = 'CRM edited successfully'

    res.status(200).json({ success: true, message: message })
});