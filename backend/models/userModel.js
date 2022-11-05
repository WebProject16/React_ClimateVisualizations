const db = require("../misc/db")
const bcrypt = require('bcrypt');

const user = {
    hello: async function(){
        try{
            //TODO: https://moodle.oulu.fi/pluginfile.php/1402946/mod_resource/content/2/node_exercise_todo_part_3.pdf

        }catch(err){
        return "Hello word asd";
        }
    },
    register: async function(username, password, callback){
        //db.query(`SELECT * FROM users WHERE username=?`,username,(err,result) => {
        //TODO: bcrypt
        try{
        db.query(`INSERT INTO users (username, password) VALUES (? , ?)`, [username, password],callback)
        }catch(err){
            return err
        }     
    },
    getUserByName: async function(username, callback){
        db.query(`SELECT * FROM users WHERE username=?`,[username],callback)
    }
}



module.exports = user;