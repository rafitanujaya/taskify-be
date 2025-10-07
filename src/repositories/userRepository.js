const create = async ({id, username, email, password}, dbClient) => {
    const query = {
        text: `INSERT INTO users(id, username, email, password) VALUES ($1, $2, $3, $4)`,
        values: [id, username, email, password]
    }

    await dbClient.query(query);
}

const findByUsername = async (username, dbClient) => {
    const query = {
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username]
    }

    const result = await dbClient.query(query)

    return result.rowCount != 0 ? true : false;
}

const findByEmail = async (email, dbClient) => {
    const query = {
        text: 'SELECT email FROM users WHERE email = $1',
        values: [email]
    }

    const result = await dbClient.query(query)

    return result.rowCount != 0 ? true : false;
}

const getByEmail = async (email, dbClient) => {
    const query = {
        text: 'SELECT id, username, password FROM users WHERE email = $1',
        values: [email]
    }

    const result = await dbClient.query(query);
    return result.rows[0];
}


export default {
    create,
    findByEmail,
    findByUsername,
    getByEmail
}