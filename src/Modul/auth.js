const pool =require('../config/pg')

const authModel = {
    checkEmail: (email) => {
        return pool.query('SELECT * FROM users WHERE email = $1', [email])
    },
    register: (data) => {
        return pool.query('INSERT INTO users ("user_id", email, fullname, password, status) VALUES ($1, $2, $3, $4, $5)', [data.user_id, data.email, data.fullname, data.hash, data.status])
    }
}

module.exports = authModel