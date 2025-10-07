import { Router } from "express";
import authRouter from "./authRoute.js";

const router = Router();

// Auth Route
router.use('/auth', authRouter)


// Health Route
router.get('/health', (req, res) => res.json({message : 'OK', data: {}}));

export default router