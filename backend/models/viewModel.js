const db = require("../misc/db")

const view = {
    delete: (data, cb) => {
        db.query("DELETE FROM views WHERE url = ? AND userID = ?", [data.url, data.userID], cb);
    },
    create: (data, cb) => {
        db.query("INSERT INTO views (url, isParallel, visualizations, userID, title, desc1, desc2, desc3, desc4, desc5, desc6, desc7) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.url, data.isParallel, data.views, data.userID, data.title, data.desc1, data.desc2, data.desc3, data.desc4, data.desc5, data.desc6, data.desc7], cb);
    },
    fetchAllByUserId: (id, cb) => {
        db.query("SELECT url, title FROM views WHERE views.userID = ? ORDER BY ID DESC", [id], cb)
    },
    fetchByUrl: (url, cb) => {
        db.query("SELECT url, isParallel, visualizations, title, desc1, desc2, desc3, desc4, desc5, desc6, desc7, users.username as 'creator' FROM views JOIN users ON users.userID = views.userID WHERE url = ?", [url], cb)
    }
}

module.exports = view;