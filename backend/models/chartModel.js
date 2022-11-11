const db = require("../misc/db")

const chart = {
   
    getV1: (cb) => {
        db.query("SELECT * FROM v1_hadcrut_annual", cb)
    }
}



module.exports = chart;