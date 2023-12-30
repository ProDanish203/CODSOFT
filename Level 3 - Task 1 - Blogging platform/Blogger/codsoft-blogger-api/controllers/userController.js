import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";

export const getProfile = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.userId)
        .populate({
            path: "blogs",
            model: Blog
        })
        ;
        if(!user) return next("Authentication Error");

        user.password = undefined;
        res.status(200).send({
            success: true,
            user
        })
    }catch(error){
        next(error)
    }
}