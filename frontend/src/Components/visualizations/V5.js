import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V5() {
  
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    Get("/charts/v5", (res) => 
    {
      if(res.status === 200){

        const data = res.data.v5;

        setMeasurements(data)

      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const data = {
    datasets: [
      {
        label: "CO2 concentration (ppm)",
        data: measurements,
        borderColor: "rgb(50, 80, 200)",
        backgroundColor: "rgb(50, 80, 200)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "co2_concentration",
        },
        pointRadius: 1,
      }
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
        text: "Vostok Ice Core CO2 measurements",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:"Mean age of the air (years BP)"
        },
        type: "linear",
        min: 2342,
        max: 417160
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text:"CO2 concentration (ppm)"
        }
      },
    },
  }

  return (
    <>
      <div className="container-fluid">
        <Line data={data} options={options} alt="Vostok Ice Core CO2 measurements data chart"/>
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Data description</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <h6 className="card-subtitle mt-2 text-muted">Sources:</h6>
          <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html" target="_blank" rel="noreferrer" className="card-link">Description</a>
          <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2" target="_blank" rel="noreferrer" className="card-link">Data source</a>
        </div>
      </div>
    </>
  );
}
