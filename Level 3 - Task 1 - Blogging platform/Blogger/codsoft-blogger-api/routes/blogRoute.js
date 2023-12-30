import { Router } from "express";
import { createBlog, getBlog, getBlogs } from "../controllers/blogController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/get", getBlogs);
router.get("/:id", getBlog);
router.post("/create", userAuth, createBlog);

export default router;