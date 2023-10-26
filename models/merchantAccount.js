import mongoose from 'mongoose';

const merchantAccountSchema = mongoose.Schema({

    clientId:{type:mongoose.Types.ObjectId}, 
    merchantId:{type:mongoose.Types.ObjectId},
    dba:{ type: String},
    mid:{ type: String},
    mcc:{ type: String},
    rdrActivation:{ type: String},
    rdrARN:{ type: String},
    rdrCAID:{ type: String},
    visaBin:{ type: String},
    rdrTier:{ type: String},
    ethocaActivation:{ type: String},
    ethocaARN:{ type: String},
    masterCardBin:{ type: String},
    rdrStatus:{ type: String},
    ethocaStatus:{ type: String},
    domainWebPage:{ type: String },
    isDelete:{ type: Boolean, default: false},
    isActive:{ type: Boolean, default: false}
},
{ timestamps: true }
)
const MerchantAccount = mongoose.model('merchantAccounts', merchantAccountSchema);
export default MerchantAccount;