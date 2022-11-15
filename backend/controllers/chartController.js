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

        chartModel.getV1Monthly((error, dataMonth) => {
            if(error){
                console.log(err);
                return res.status(500).json({status:"error", msg:"Error on fetching chart V1 monthly data"})
            }
            if(!dataMonth){
                return res.status(500).json({status:"error", msg:"No data found in V1 monthly table"})
            }

            res.json({status:"success", data: data, dataMonth: dataMonth})
        })
    })
}

module.exports = {
    v1
}