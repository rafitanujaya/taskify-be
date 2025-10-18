import { v4 as uuid } from "uuid";
import pgClient from "../database/postgre/pgClient.js";
import taskRepository from "../repositories/taskRepository.js";
import taskValidation from "../validators/taskValidation.js"
import validate from "../validators/validation.js"
import ResponseError from "../exceptions/responseError.js";

const create = async (payload, userId) => {
    const task = validate(taskValidation.create, payload);
    const client = await pgClient.getClient();
    try {
        console.log(`task : ${task}`);
        task.id = uuid()
        await taskRepository.create(task, userId, client);
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

const getListByUserId = async (userId) => {
    const client = await pgClient.getClient();
    try {
        const result = await taskRepository.findByUserId(userId, client);
        return result
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

const getDetailById = async (id) => {
    const client = await pgClient.getClient()
    try {
        console.log(id);
        const task = await taskRepository.findById(id, client);
        if(!task) {
            throw new ResponseError(404, "Task Not Found")
        }
        return {
            id: task.id,
            title: task.title,
            status: task.status,
            description: task.description
        }
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

const update = async (payload, userId) => {
    const task = validate(taskValidation.update, payload)
    const client = await pgClient.getClient();
    try {
        const taskCurrent = await taskRepository.findById(task.id, client);
        if(!taskCurrent) {
            throw new ResponseError(404, 'Task Not Found')
        }
        if(taskCurrent.user_id != userId) {
            throw new ResponseError(403, 'Forbidden')
        }
        await taskRepository.update(task, client);
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

const deleteById = async (id, userId) => {
    const client = await pgClient.getClient();
    try {
        const task = await taskRepository.findById(id, client);
        if(!task) {
            throw new ResponseError(404, 'Task Not Found')
        }
        if(task.user_id != userId) {
            throw new ResponseError(403, 'Forbidden');
        }

        await taskRepository.deleteById(id, client)

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

const getCountByStatus = async (userId) => {
    const client = await pgClient.getClient();

    try {
        const result = await taskRepository.getCountByStatus(userId, client)
        const stat = {
            todoCount: 0,
            inProgressCount : 0,
            completedCount: 0,
            totalTask: 0,
        }

        if(result.length < 1) {
            return stat
        }

        for (const val of result) {
            if(val.status == 'todo') {
                stat.todoCount = Number(val.count)
            }
            if(val.status == 'in_progress') {
                stat.inProgressCount = Number(val.count)
            }
            if(val.status == 'completed') {
                stat.completedCount = Number(val.count)
            }
        }

        stat.totalTask = stat.todoCount + stat.inProgressCount + stat.completedCount

        return stat

    } catch (error) {
        throw error
    } finally {
        client.release()
    }
}

const getLatest = async (userId) => {
    const client = await pgClient.getClient();
    try {
        const tasks = await taskRepository.getLatest(userId, client);
        if (tasks < 1) {
            return []
        }
        return tasks.map(task => {
            return {
                id: task.id,
                userId: task.user_id,
                status: task.status,
                title: task.title,
                description: task.description,
                createdAt: task.created_at.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                })
            }
        })
    } catch (error) {
        
    }finally {
        client.release()
    }
}

const getListGroupByStatus = async (userId) => {
    const client = await pgClient.getClient();

    try {
        const tasks = await taskRepository.getListGroupByStatus(userId, client)
        return tasks
    } catch (error) {
        throw error
    } finally {
        client.release()
    }
} 


export default {
    create,
    getDetailById,
    update,
    getListByUserId,
    deleteById,
    getCountByStatus,
    getLatest,
    getListGroupByStatus
}