import { Router } from "express";
import authRouter from "./authRoute.js";
import taskRouter from "./taskRoute.js";

const router = Router();

// Auth Route
router.use('/auth', authRouter);

// Task Route
router.use('/tasks', taskRouter);


// Health Route
router.get('/health', (req, res) => res.json({message : 'OK', data: {}}));

export default router