import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V3() {
  
  const [isAnnual, setIsAnnual] = useState(true);
  const [dataYear, setDataYear] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);

  useEffect(() => {
    Get("/charts/v3", (res) => 
    {
      if(res.status === 200){
        setDataYear(res.data.dataYear)
        setDataMonth(res.data.dataMonth)
      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const data = {
    datasets: [
      {
        label: isAnnual ? "CO2 pitoisuus vuosittain" : "CO2 pitoisuus kuukausittain",
        data:  isAnnual ? dataYear : dataMonth,
        borderColor: isAnnual ? "rgb(50, 80, 200)" : "rgb(230, 150, 15)",
        backgroundColor: isAnnual ? "rgb(50, 80, 200)" : "rgb(230, 150, 15)",
        parsing: {
          xAxisKey: isAnnual ? "year" : "time",
          yAxisKey: isAnnual ? "mean" : "average",
        },
        pointRadius: 2,
      },
    ]
  }

  const options =
  {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mauna Loan CO2 pitoisuuden mittaukset " + (isAnnual ? "(vuosittain)" : "(kuukausittain)"),
      },
    },
    scales: {
        xAxes: {
            type: isAnnual ? "linear" : "time",
        },

      yAxes: {
        type: "linear",
      },
    },
  }

  return (
    <>
      <div className="container-fluid">
        <Line data={data} options={options} alt="Anomaly data chart"/>
      </div>
      <div className="container-fluid">
        <button onClick={() => setIsAnnual(!isAnnual)} className="btn btn-outline-primary mt-2">{isAnnual ? "Näytä kuukausittainen data" : "Näytä vuosittainen data"}</button>
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          <p className="card-text">Viivakaavio esittää ilmakehän hiilidioksidipitoisuuksia perustuen Mauna Loalla tehtyihin mittauksiin.</p>
          <p className="card-text">Aikajakso ~60 vuotta, vuosina 1958-2021.</p>
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noreferrer" className="card-link">Monthly Average Mauna Loa CO2</a>
          <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer" className="card-link">Global Monitoring Laboratory</a>
        </div>
      </div>
    </>
  );
}
