import taskService from "../services/taskService.js"

const create = async (req, res, next) => {
    try {
        const body = req.body
        const userId = req.user.id

        await taskService.create(body, userId);

        res.status(201).json({
            message: 'Succes Create Task',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

const getList = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await taskService.getListByUserId(userId)
        res.json({
            message: 'Success get list tasks',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getDetailById = async (req, res, next) => {
    try {
        const {taskId} = req.params

        const result = await taskService.getDetailById(taskId);
        res.json({
            message: 'Success Get Detail Task',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const {taskId} = req.params
        console.log(req.body);
        const {title, status, description}= req.body
        const userId = req.user.id

        const payload = {
            id : taskId,
            title,
            status,
            description
        }

        await taskService.update(payload, userId)

                res.json({
                    message: 'Success Update Task',
                    data: {}
                })
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {taskId} = req.params

        await taskService.deleteById(taskId, userId)
        
        res.json({
            message: 'Success Delete Task',
            data: {}
        })

    } catch (error) {
        next(error)
    }
}

const getCountByStatus = async (req, res, next) => {
    try {
        const userId = req.user.id

        const result = await taskService.getCountByStatus(userId)

        res.json({
            message: 'Success get statistic todo',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getLatest = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await taskService.getLatest(userId);
        res.json({
            message: 'Success get latest task',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getListGroupByStatus = async (req, res, next) => {
    try {
        const userId = req.user.id
        const result = await taskService.getListGroupByStatus(userId);
        res.json({
            message: 'Success Get List Group By Status',
            data : result
        })
    } catch (error) {
        next(error)
    }
}




export default {
    create,
    getList,
    getDetailById,
    updateById,
    deleteById,
    getCountByStatus,
    getLatest,
    getListGroupByStatus
}