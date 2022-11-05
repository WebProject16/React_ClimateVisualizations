const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    insecureAuth : true
})

db.connect(function(err) {
    if(err){
        return console.error('error: ' + err.message)
    }

    console.log('Succesfully connected to the database')
})

module.exports = db