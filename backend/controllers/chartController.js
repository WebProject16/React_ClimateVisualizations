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

        res.status(200).json({dataYear: data[0], dataMonth: data[1], v10: data[2], v4_1: data[3],v4_2: data[4],v4_3: data[5]})
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

        let years = [];

        // push years to above array to use as labels
        data.forEach(result =>
            years.push(parseInt(result.age))
        );

        let measurements = [];

        // push co2 values to above array
        data.forEach(result =>
            measurements.push(result.co2_ppm)
        );

        let payload = {
            labels: years.reverse(),
            measurements: measurements.reverse()
        }

        res.status(200).json(payload)
    })
}

const v7 = (req, res) => {
    chartModel.getV7((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V7 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V7 table"})
        }

        res.status(200).json({v7_temp: data[0], v7_co2: data[1], v10: data[2]})
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
const v9 = (req, res) => {
    chartModel.getV9((err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({status:"error", msg:"Error on fetching chart V9 data"})
        }

        if(!data){
            return res.status(500).json({status:"error", msg:"No data found in V9 table"})
        }

        // v9_2

        const energyData = [];

        for(let i = 0; i < 6; i++){
            energyData.push({sector: data[1][i].sector, share: data[1][i].share});
        }

        const industrialData = [];

        for(let i = 6; i < 8; i++){
            industrialData.push({sector: data[1][i].sector, share: data[1][i].share});
        }

        const agricultural = [];

        for(let i = 8; i < data[1].length - 2; i++){
            agricultural.push({sector: data[1][i].sector, share: data[1][i].share});
        }

        const waste = [];

        for(let i = data[1].length - 2; i < data[1].length; i++){
            waste.push({sector: data[1][i].sector, share: data[1][i].share});
        }

        // v9_3

        const transport = [];

        for(let i = 0; i < 5; i++){
            transport.push({sector: data[2][i].sector, share: data[2][i].share});
        }

        const energy_buildings = [];

        for(let i = 5; i < 7; i++){
            energy_buildings.push({sector: data[2][i].sector, share: data[2][i].share});
        }

        const energy_industry = [];

        for(let i = 7; i < 14; i++){
            energy_industry.push({sector: data[2][i].sector, share: data[2][i].share});
        }

        const fugitive_emissions = [];

        for(let i = 16; i < 18; i++){
            fugitive_emissions.push({sector: data[2][i].sector, share: data[2][i].share});
        }

        const payload = {
            v9_1: data[0],
            v9_2: {
                "Energy": energyData,
                "Industrial processes": industrialData,
                "Agriculture, Forestry & Land Use (AFOLU)": agricultural,
                "Waste": waste
            },
            v9_3: {
                "Transport": transport,
                "Energy in buildings (elec and heat)": energy_buildings,
                "Energy in industry": energy_industry,
                "Fugitive emissions from energy": fugitive_emissions,
            }
        }

        res.status(200).json(payload)
    })
}
module.exports = {
    v1,
    v3,
    v4,
    v5,
    v6,
    v7,
    v8,
    v9
}