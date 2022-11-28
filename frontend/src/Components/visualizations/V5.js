import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V5() {
  
  const [measurements, setMeasurements] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    Get("/charts/v5", (res) => 
    {
      if(res.status === 200){

        const data = res.data;

        setLabels(data.labels)

        setMeasurements(data.measurements)

      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const data = {
    labels: labels,
    datasets: [
      {
        label: "CO2 mittaukset",
        data: measurements,
        borderColor: "rgb(50, 80, 200)",
        backgroundColor: "rgb(50, 80, 200)",
        pointRadius: 0
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
        text: "Ilmakehän hiilidioksidipitoisuudet perustuen Neuvostoliiton etelämantereen Vostok aseman jääkairauksiin",
        font: {
          size:"20"
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text:"Ilman keski-ikä ennen vuotta 1950 (vuotta)"
        }
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text:"CO2 pitoisuus (ppmv)"
        }
      },
    },
  }

  return (
    <>
      <div className="container-fluid">
        <Line data={data} options={options} alt="Ilmakehän hiilidioksidipitoisuudet perustuen Neuvostoliiton etelämantereen Vostok aseman jääkairauksiin kuvaaja."/>
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          <p className="card-text">Viivakaavio esittää ilmakehän hiilidioksidipitoisuuksia perustuen Neuvostoliiton etelämantereen Vostok aseman jääkairauksiin.</p>
          <p className="card-text">Aikajakso on 417160 - 2342 vuotta ennen nykyhetkeä.</p>
          
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html" target="_blank" rel="noreferrer" className="card-link">Tietojoukon kuvaus</a>
          <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2" target="_blank" rel="noreferrer" className="card-link">Tietojoukko</a>
        </div>
      </div>
    </>
  );
}
