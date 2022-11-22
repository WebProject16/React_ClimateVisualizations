const db = require("../misc/db")

const user = {
    register: (username, password, callback) => {
        db.query(`INSERT INTO users (username, password) VALUES (? , ?)`, [username, password], callback)
    },
    getUserByName: (username, callback) => {
        db.query(`SELECT * FROM users WHERE username=?`, [username], callback)
    },
    deleteUserByName: (username, callback) => {
        db.query(`DELETE FROM users WHERE username=?`, [username], callback)
    }
}

module.exports = user;