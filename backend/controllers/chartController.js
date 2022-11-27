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


        res.status(200).json({dataYear: data[0], dataMonth: data[1], dataV2: data[2]})
    })
}

const v3 = (req, res) => {

    chartModel.getV3((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V3 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V3 table"})
        }

        res.status(200).json({dataYear: data[0], dataMonth: data[1]})
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

        res.status(200).json({v4: data[0], v3_annual: data[1]})
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

        res.status(200).json({v5: data})
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

        res.status(200).json({v6: data})
    })
}

const v8 = (req, res) => {

    chartModel.getV8((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V8 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V8 table"})
        }

        res.status(200).json({v8: data})
    })
}
module.exports = {
    v1,
    v3,
    v4,
    v5,
    v6,
    v8
}