import { Router } from "express";
import { addComment } from "../controllers/commentController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/add", userAuth, addComment);

export default router;