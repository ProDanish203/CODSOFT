import User from "../models/userModel.js";
import Jobs from "../models/jobModel.js";
import Applications from "../models/applicationModel.js";

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Jobs.find()
        .select("_id title desc author")
        .populate({
            path: "author",
            model: User,
            select: "_id username name"
        })

        res.status(200).send({
            success: true,
            message: "Jobs fetched succesfully",
            jobs,
        });
    } catch (error) {
        next(error);
    }
};

export const getJob = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Jobs.findById(id)
        .populate({
            path: "author",
            model: User,
            select: "_id username name"
        })
        .populate({
            path: "applications",
            model: Applications,
        })
        ;

        res.status(200).send({
            success: true,
            message: "Job fetched succesfully",
            job,
        });

    } catch (error) {
        next(error);
    }
};

export const createJob = async (req, res, next) => {
    try {
        
        const {title, desc, requirements} = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) return next("Authentication Error");
        if(user.role !== "employer") return next("You are not authorized to post a job listing");

        const job = await Jobs.create({
            title, desc, requirements,
            author: user._id
        });
        if(!job) return next("Failed to list the job")

        const updateUser = await User.findByIdAndUpdate(req.user.userId, 
            { $push: { postedJobs: job._id }},
            { new: true }   
        );

        if(!updateUser) return next("Failed to update the user");

        res.status(200).send({
            success: true,
            message: "Job listed succesfully",
            job,
        });
        
    } catch (error) {
        next(error);
    }
};

export const applyForJob = async (req, res, next) => {
    try {
        
        const {coverLetter, resume} = req.body;
        const { jobid } = req.params

        if(!jobid) return next("Job Id is required");

        const user = await User.findById(req.user.userId);
        if (!user) return next("Authentication Error");
        if(user.role !== "candidate") return next("You are not authorized to apply for this job");

        const job = await Jobs.findById(jobid);
        if(!job) return next("Job does not exist")

        const application = await Applications.create({
            author: user._id,
            coverLetter, resume,
            jobId: job._id
        });

        if(!application) return next("Failed to apply for this job")

        const updateUser = await User.findByIdAndUpdate(req.user.userId, 
            { $push: { applciations: job._id }},
            { new: true }   
        );

        const updateJob = await Jobs.findByIdAndUpdate(job._id, 
            { $push : { applications: application._id }},
            { new: true }
        );

        if(!updateUser || !updateJob) return next("Failed to update the job listing");

        res.status(200).send({
            success: true,
            message: "Application sent succesfully",
        });
        
    } catch (error) {
        next(error);
    }
};
