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
    },

    getV7: (cb) => {
        db.query("SELECT kyrBP*-1 AS year,p50 FROM v7_gast; SELECT kyrBP/-1000 AS year,co2 FROM v7_co2; SELECT year/1000 AS year,clean_desc_fi,years_ago*0 AS years_ago FROM v10_timeline_of_the_human_condition_interesting WHERE year<0", cb)
    },

    getV8: (cb) => {
        db.query("SELECT * FROM v8_co2_emissions", cb)
    }
}



module.exports = chart;