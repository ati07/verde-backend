import CrmObservation from "../models/crmObservation.js";
import tryCatch from "./utils/tryCatch.js";



export const createCrmObservation = tryCatch(async (req, res) => {
    let crmObservationPayload = req.body
    crmObservationPayload.addedBy = req.auth.user._id
  
    const newCrmObservation = new CrmObservation(crmObservationPayload);
  
    await newCrmObservation.save()
    res.status(200).json({ success: true, message: 'Observation added successfully' });
  })

  export const getCrmObservation = tryCatch(async (req, res) => {
    let findData = {
        isDelete: false,
        leadId: req.params.leadId
      }
      const crmObservation = await CrmObservation.find(findData)
      .populate([{ path: 'addedBy', model: 'users' }]).sort({ _id: -1 });
    
      res.status(200).json({ success: true, result: crmObservation });
  })