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

module.exports = {
    v1
}