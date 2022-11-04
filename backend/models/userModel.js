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
    register: async function(password, username){
        db.query(`SELECT * FROM users WHERE username=??`,username,(err,result) => {
            if(err){return err}
            if(result.length !== 0){return "Username already taken"}
            bcrypt.hash(password, 8).then((hash)=> {
                let cryptPw = hash
            }).then(()=>{
                db.query(`INSERT INTO users (username, password) VALUES (? , ?)`, [username, password],(err,result)=>{
                    if(err){return err}
                })
            })
            return "Success"
        })
    }
}



module.exports = user;