const db = require("../misc/db")

const view = {
    delete: (data, cb) => {
        db.query("DELETE FROM views WHERE url = ? AND userID = ?", [data.url, data.userID], cb);
    },
    create: (data, cb) => {
        db.query("INSERT INTO views (url, isParallel, visualizations, userID) VALUES (?, ?, ?, ?)", [data.url, data.isParallel, data.views, data.userID], cb);
    },
}

module.exports = view;