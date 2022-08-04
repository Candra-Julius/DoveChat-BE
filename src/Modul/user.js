const pool = require('../config/pg')

const userModel = {
    getUser: (idUser) => {
        return pool.query('SELECT * FROM users WHERE user_id <> $1',[idUser])
    },
    getProfile: (idUser) => {
        return pool.query('SELECT * FROM users WHERE user_id = $1',[idUser])
    },
    updateProfile: (idUser) => {
        return pool.query('UPDATE users SET fullname = $1, usersname = $2, description = $3 WHERE user_id = $4', [idUser.fullname, idUser.username, idUser.description, idUser.user_id])
    },
    updateProfileWithAva: (idUser) => {
        return pool.query('UPDATE users SET fullname = $1, usersname = $2, description = $3, avatar = $4 WHERE user_id = $5', [idUser.fullname, idUser.username, idUser.description, idUser.avatar ,idUser.user_id])
    }
}

module.exports = userModel