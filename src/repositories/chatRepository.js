const create = async ({id, userId, senderType, message}, dbClient) => {

    const query = {
        text : `INSERT INTO chatbots (id, user_id, sender_type, message) VALUES ($1, $2, $3, $4)`,
        values: [id, userId, senderType, message]
    }

    await dbClient.query(query);

}

const getListByUserId = async (userId, dbClient) => {

    const query = {
        text: `SELECT id, sender_type, message FROM chatbots where user_id = $1 ORDER BY created_at ASC`,
        values: [userId]
    }

    const result = await dbClient.query(query);
    return result.rows
}

export default {
    create,
    getListByUserId
}