import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V6(props) {
    
    const [v6, setV6] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        Get("/charts/v6", (res) => 
        {
          if(res.status === 200){
            setV6(res.data.measurements);
            setLabels(res.data.labels);
          }else{
            console.log("Error: ", res)
          }
        })
      }, [])
      
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Hiilidioksidipitoisuus (ppm)",
            data: v6,
            borderColor: "rgb(50, 80, 200)",
            backgroundColor: "rgb(50, 80, 200)",
            parsing: {
              yAxisKey: "co2_ppm",
            },
            pointRadius: 1
          }
        ]
      }
      

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ilmakehän hiilidioksidipitoisuudet perustuen etelämantereen jääkairauksiin",
        font: {
          size:"20"
        }
      }
    },
    scales: {
      y: {
        type: "linear",
        min: 150,
        max: 400,
        title: {
          display: true,
          text:"CO2 pitoisuus (ppmv)"
        }
      }
    }
  }
  
  return (
    <div className="child">
      <div className="container-fluid">
        <Line data={data} options={options} alt="CO2 data chart"/>
      </div>
      <div className="container-fluid">
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          {
            !props.description ?
              <div>
                <p className="card-text">Viivakaavio esittää ilmakehän hiilidioksidipitoisuuksia perustuen yhdistelmätutkimukseen etelmäntereen jääkairauksista.</p>
                <p className="card-text">Aikajakso ~800000 vuotta.</p>
              </div>
            : <div>
              <p>{props.description}</p>
            </div>
          }
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://www.ncei.noaa.gov/access/paleo-search/study/17975" target="_blank" rel="noopener noreferrer" className="card-link">Antarctic Ice Cores Revised 800KYr </a>
        </div>
      </div>
    </div>
  );
}