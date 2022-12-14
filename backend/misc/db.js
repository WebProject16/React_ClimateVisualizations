const mysql = require('mysql2');
let db

if(process.env.NODE_ENV == "production"){
db = mysql.createPool({
    socketPath: process.env.GAE_DB_SOCKET,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10
})}else{
db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    multipleStatements: true,
    connectionLimit: 10
})
}

module.exports = db