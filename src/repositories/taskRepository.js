const create = async ({id, status, title, description}, userId, dbClient) => {
    const query = {
        text : `INSERT INTO tasks (id, user_id, status, title, description) VALUES ($1, $2, $3, $4, $5)`,
        values : [id, userId, status, title, description]
    }

    await dbClient.query(query)
}

const findByUserId = async (userId, dbClient) => {
    const query = {
        text: `SELECT id, status, title, description FROM tasks WHERE user_id = $1`,
        values: [userId]
    }

    const result = await dbClient.query(query);
    return result.rows
}
 
const findById = async (id, dbClient) => {
    const query = {
        text: `SELECT id, user_id, status, title, description FROM tasks WHERE id = $1`,
        values: [id]
    }
    const result = await dbClient.query(query)
    return result.rows[0]
}

const update = async ({id, status, title, description}, dbClient) => {
    const query = {
        text: `UPDATE tasks SET status = $1, title = $2, description = $3 WHERE id = $4`,
        values: [status, title, description, id]
    }

    await dbClient.query(query)
}

const deleteById = async (id, dbClient) => {
    const query = {
        text: `DELETE FROM tasks WHERE id = $1`,
        values: [id]
    }

    await dbClient.query(query)
}

const getCountByStatus = async (userId, dbClient) => {
    const query = {
        text: `SELECT status, COUNT(id) FROM tasks WHERE user_id = $1 GROUP BY status`,
        values: [userId]
    }

    const result = await dbClient.query(query);
    return result.rows
}


const getLatest = async (userId, dbClient) => {
    const query = {
        text: `SELECT id, user_id, status, title, description, created_at FROM tasks WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5`,
        values: [userId]
    }

    const result = await dbClient.query(query);
    return result.rows;
}

const getListGroupByStatus = async (userId, dbClient) => {
    const query = {
        text: `SELECT id, user_id, status, title, description, created_at FROM tasks WHERE user_id = $1 ORDER BY created_at DESC`,
        values: [userId]
    }

    const result = await dbClient.query(query);
    const tasks = result.rows;

    const grouped = {
        todo: [],
        inProgress: [],
        completed: []
    }

    tasks.forEach(task => {
        let status = ''
        if(task.status == 'todo') {
            task.status = 'Todo'
            status = 'todo'
        } else if(task.status == 'in_progress') {
            task.status = 'In Progress'
            status = 'inProgress'
        } else if(task.status == 'completed') {
            task.status = 'Completed'
            status = 'completed'
        }

        grouped[status].push(task)
    });

    return grouped

}


export default {
    create, findById, update, findByUserId, deleteById, getCountByStatus, getLatest, getListGroupByStatus
}