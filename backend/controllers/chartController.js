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

        let years = [];

        // push years to above array
        data.forEach(result =>
            years.push(result.year)
        );

        // delete years from every object
        data.forEach(result =>
            delete result.year
        );

        // get countries as keys
        const keys = Object.keys(data[0]);

        // create object with years
        let payload = {
            years: years,
        }

        // iterate over every country
        keys.forEach(key =>
            {
                // add country to payload object assigned to empty array
                payload[key] = [];

                // iterate every object in the db result
                data.forEach(result =>
                    // push every datapoint to payload object corrected million tons of carbon to
                    // million tonnes of CO2 by multiplying with 3.664
                    payload[key].push(result[key])
                )
            }
        )

        res.json(payload);
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