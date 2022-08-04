const pool = require('../config/pg')

const chatModule = {
    getChat: (sender, reciver) => {
        return pool.query(`SELECT * FROM chat WHERE sender = '${sender}' AND reciver = '${reciver}' OR sender = '${reciver}' AND reciver = '${sender}' ORDER BY date ASC`)
    },
    getReciverProfile: (id) => {
        return pool.query('SELECT * FROM users WHERE user_id = $1', [id])
    },
    insertChat: (data) => {
        return pool.query('INSERT INTO chat (sender, reciver, message, date, chatId) VALUES ($1, $2, $3, $4, $5)', [data.sender, data.reciver, data.message, data.date, data.id])
    },
    deleteChat: (data) => {
        return pool.query('DELETE FROM chat WHERE chatId = $1', [data])
    }
}

module.exports = chatModule