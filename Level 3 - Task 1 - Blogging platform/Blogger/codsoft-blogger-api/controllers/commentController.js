import Comment from "../models/commentModel.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

export const addComment = async (req, res, next) => {
    try {
        const { blogId, text } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return next("Authentication Error");

        const blog = await Blog.findById(blogId);
        if (!blog) return next("Blog not found");

        const comment = await Comment.create({
            text,
            author: user._id,
            parent: blog._id,
        });
        if (!comment) return next("Failed to add comment");

        blog.comments.push(comment._id);
        await blog.save();

        res.status(200).send({
            success: true,
            comment
        });
    } catch (error) {
        next(error);
    }
};
