import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
    },
    desc: {
        type: String,
        required: [true, "Job description is required"],
    },
    requirements: {
        required: [true, "Job requirements is required"],
        type: [
            {
                type: String,
            }
        ]
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Author Id is required"],
    },
    applications:{
        type: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Application"
            },
        ], 
        default: []
    },
}, {timestamps: true });

export default mongoose.model("Job", JobSchema);