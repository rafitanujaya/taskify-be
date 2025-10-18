import { Router } from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login)
authRouter.get('/verify', authMiddleware, authController.verify)
authRouter.get('/google', authController.loginGoogle)
authRouter.get('/google/callback', authController.loginGoogleCb)


export default authRouter;