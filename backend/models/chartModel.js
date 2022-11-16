const db = require("../misc/db")

const chart = {
   
    getV1: (cb) => {
        db.query("SELECT * FROM v1_hadcrut_annual; SELECT * FROM v1_hadcrut_monthly; SELECT * FROM v2_northern_hemisphere_reconstruction", cb)
    }
}



module.exports = chart;