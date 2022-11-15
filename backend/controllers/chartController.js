const chartModel = require('../models/chartModel.js');


const v1 = (req, res) => {

    chartModel.getV1((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V1 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V1 table"})
        }

        res.json({status:"success", data: data})
    })
}
const v3_annual = (req, res) => {

    chartModel.getV3_annual((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V3_annual data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V3_annual table"})
        }

        res.json({status:"success", data: data})
    })
}
const v3_monthly = (req, res) => {

    chartModel.getV3_monthly((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V3_monthly data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V3_monthly table"})
        }

        res.json({status:"success", data: data})
    })
}
const v4 = (req, res) => {

    chartModel.getV4((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V4 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V4 table"})
        }

        res.json({status:"success", data: data})
    })
}
const v5 = (req, res) => {

    chartModel.getV5((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V5 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V5 table"})
        }

        res.json({status:"success", data: data})
    })
}
const v6 = (req, res) => {

    chartModel.getV6((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V6 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V6 table"})
        }

        res.json({status:"success", data: data})
    })
}

module.exports = {
    v1,
    v3_annual,
    v3_monthly,
    v4,
    v5,
    v6
}