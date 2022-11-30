import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V8() {
  
  const [measurements, setMeasurements] = useState([]);
  const [labels, setLabels] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    Get("/charts/v8", (res) => 
    {
      if(res.status === 200){

        const data = res.data;
        setLabels(data.years);

        delete data.years;
        setMeasurements(data);

        setCountries(Object.keys(data));

      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const data = {
    labels: labels,
    datasets: countries.map(country => {

      const color = "rgb(" + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255))  + "," + (Math.floor(Math.random() * 255)) + ")";

      return {
        label:country,
        data: measurements[country],
        borderColor: color,
        backgroundColor: color,
        pointRadius: 0
      }
    })
  }

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 10.5
          }
        },
        maxHeight: 400
      },
      title: {
        display: true,
        text: "Maakohtaiset CO2 päästöt",
        font: {
          size:"20"
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text:"vuosi",
          font: {
            size:"12"
          }
        }
      },
      y: {
        stacked: true,
        type: "linear",
        title: {
          display: true,
          text:"MtCO2/yr",
          font: {
            size:"12"
          }
        }
      }
    }
  }

  return (
    <>
      <div className="container-fluid">
        <Line data={data} options={options} id="v8Chart" alt="Pinottu viivakaavio ajan suhteen maakohtaisista CO2 päästöistä."/>
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          <p className="card-text">Pinottu viivakaavio esittää maakohtaiset hiilidioksidipäästöt eri vuosina.</p>
          <p className="card-text">Aikajakso on 1959 - 2020 vuotta.</p>
          
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://essd.copernicus.org/articles/14/1917/2022" target="_blank" rel="noreferrer" className="card-link">Tietojoukon kuvaus</a>
          <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D" target="_blank" rel="noreferrer" className="card-link">Tietojoukon lähteet</a>
        </div>
      </div>
    </>
  );
}
