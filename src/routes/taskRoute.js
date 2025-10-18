import { Router } from "express";
import taskController from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const taskRouter = Router();

taskRouter.post('/', authMiddleware ,taskController.create);
taskRouter.get('/', authMiddleware ,taskController.getList);
taskRouter.get('/grouped', authMiddleware, taskController.getListGroupByStatus)
taskRouter.get('/stats', authMiddleware, taskController.getCountByStatus);
taskRouter.get('/latest', authMiddleware, taskController.getLatest)
taskRouter.get('/:taskId', authMiddleware ,taskController.getDetailById);
taskRouter.put('/:taskId', authMiddleware, taskController.updateById);
taskRouter.delete('/:taskId', authMiddleware, taskController.deleteById);

export default taskRouter