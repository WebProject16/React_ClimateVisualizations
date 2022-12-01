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

        let years = [];

        // push years to above array
        data.forEach(result =>
            years.push(result.year)
        );

        let measurements = [];
        
        data.forEach(result =>
            measurements.push(result.co2_concentration)
        );

        let payload = {
            labels: years.reverse(),
            measurements: measurements.reverse()
        }

        res.status(200).json(payload)
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

        // create templatePayload object
        let templatePayload = {};

        // create array for the countries and their last emission entry
        let countriesWithLastEmission = [];
        
        // iterate over every country
        keys.forEach(key => {
            // add country to templatePayload object assigned to empty array
            templatePayload[key] = [];

            // iterate every object in the db result
            data.forEach(result => {
                // push every datapoint to templatePayload object corrected million tons of carbon to
                // million tonnes of CO2 by multiplying with 3.664
                templatePayload[key].push(result[key] * 3.664);
            })

            // insert into the array array of the country and its last emission entry
            countriesWithLastEmission.push([key, data[data.length - 1][key]]);
        })

        // sort the countries based on last emission entry
        countriesWithLastEmission.sort((first, second) => {
            return second[1] - first[1];
        });

        let correctOrder = [];

        // iterate over the countries array and push only the name of the country to above array
        countriesWithLastEmission.forEach(item => {
            correctOrder.push(item[0])
        })

        // reverse the order
        correctOrder.reverse();

        let payload = {}

        // iterate over the countries array that are ordered by last emission entry
        // then assign new var to payload object and get thats value from the templatePayload object
        correctOrder.forEach(country => {
            payload[country] = templatePayload[country]
        })

        // add years to the object
        payload["years"] = years;

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