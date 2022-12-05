const db = require("../misc/db")

const view = {
    delete: (data, cb) => {
        db.query("DELETE FROM views WHERE url = ? AND userID = ?", [data.url, data.userID], cb);
    },
    create: (data, cb) => {
        db.query("INSERT INTO views (url, isParallel, visualizations, userID, description) VALUES (?, ?, ?, ?, ?)", [data.url, data.isParallel, data.views, data.userID, data.description], cb);
    },
    fetchAllByUserId: (id, cb) => {
        db.query("SELECT url, isParallel, visualizations, description FROM views WHERE userID = ? ORDER BY ID DESC", [id], cb)
    },
    fetchByUrl: (url, cb) => {
        db.query("SELECT url, isParallel, visualizations, description, users.username as 'creator' FROM views JOIN users ON users.userID = views.userID WHERE url = ?", [url], cb)
    }
}

module.exports = view;