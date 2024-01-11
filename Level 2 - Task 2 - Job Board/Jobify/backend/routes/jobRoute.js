import { Router } from "express";
import { getAllJobs, getJob, createJob, applyForJob } from "../controllers/jobController.js";
import userAuth from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/allJobs",  getAllJobs);
router.get("/:id", getJob);
router.post("/create", userAuth , createJob);
router.post("/apply/:jobid", userAuth , applyForJob);

export default router;