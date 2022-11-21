const db = require("../misc/db")

const chart = {
   
    getV1: (cb) => {
        db.query("SELECT * FROM v1_hadcrut_annual; SELECT * FROM v1_hadcrut_monthly; SELECT * FROM v2_northern_hemisphere_reconstruction", cb)
    },

    getV3: (cb) => {
        db.query("SELECT * FROM v3_mauna_loa_co2_annual; SELECT * FROM v3_mauna_loa_co2_monthly", cb)
    },

    getV4: (cb) => {
        db.query("SELECT * FROM v4_antarctic_co2; SELECT * FROM v3_mauna_loa_co2_annual", cb)
    },
    
    getV5: (cb) => {
        db.query("SELECT * FROM v5_vostok_co2", cb)
    },

    getV6: (cb) => {
        db.query("SELECT * FROM v6_ice_core", cb)
    }
}



module.exports = chart;