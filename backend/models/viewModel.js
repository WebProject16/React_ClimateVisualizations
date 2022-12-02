const db = require("../misc/db")

const view = {
    delete: (data, cb) => {
        db.query("DELETE FROM views WHERE url = ? AND userID = ?", [data.url, data.userID], cb);
    } 
}

module.exports = view;