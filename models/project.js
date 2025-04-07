import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    name: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const Project = mongoose.model('projects', projectSchema);
export default Project;