import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
    author:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    coverLetter: String,
    resume: {
        type: String,
        required: [true, "Resume is required"]
    },
    jobId: {
        type: mongoose.Types.ObjectId,
        ref: "Job"
    }
}, {timestamps: true });

export default mongoose.model("Application", ApplicationSchema);