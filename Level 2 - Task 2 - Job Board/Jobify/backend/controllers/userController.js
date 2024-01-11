import Applications from "../models/applicationModel.js";
import Jobs from "../models/jobModel.js";
import User from "../models/userModel.js";

export const getProfile = async (req, res, next) => {
    try {
        const id = req.user.userId;
        const role = req.user.role;

        const user = await User.findById(id)
            .populate({
                path: role === 'candidate' ? 'applications' : 'postedJobs',
                model: role === 'candidate' ? Applications : Jobs,
                populate: {
                    path: 'author',
                    model: User,
                },
                populate: {
                    path: role === 'candidate' ? 'jobId' : 'applications',
                    model: role === 'candidate' ? Jobs : Applications,
                },
            });

        if (!user) return next("Authentication Error");

        user.password = undefined;
        res.status(200).send({
            success: true,
            user,
        });
    } catch (error) {
        next("Error: " + error);
    }
};
