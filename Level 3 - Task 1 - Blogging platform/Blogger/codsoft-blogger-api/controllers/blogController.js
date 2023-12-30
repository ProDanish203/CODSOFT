import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const createBlog = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return next("Authentication Error");

        const create = await Blog.create({
            title,
            content,
            author: user._id,
        });
        if (!create) return next("Failed to create blog");

        res.status(200).send({
            success: true,
            create,
        });
    } catch (error) {
        next(error);
    }
};

export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate({path: 'author', model: User, select: 'username'});

        res.status(200).send({
            success: true,
            blogs,
        });
    } catch (error) {
        next(error);
    }
};

export const getBlog = async (req, res, next) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id)
        .populate({path: 'author', model: User, select: 'username'})
        .populate(
            {
                path: 'comments', 
                model: Comment,
                populate: {
                    path: 'author',
                    model: User,
                    select: 'username',
                },
            }
        )
        ;
        if (!blog) return next("Blog not found");

        res.status(200).send({
            success: true,
            blog,
        });
    } catch (error) {
        next(error);
    }
};