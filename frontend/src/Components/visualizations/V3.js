import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V3() {
  const [elements, setElements] = useState([])

  useEffect(() => {
    Get("/charts/v3", (res) => 
    {
      if(res.status === 200){
        setElements(res.data)
      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const data = {
    datasets: [
      {
        label: "Mauna Loa CO2 pitoisuus vuosittain",
        data: elements.dataYear,
        borderColor: "rgb(50, 80, 200)",
        backgroundColor: "rgb(50, 80, 200)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "mean",
        },
        pointRadius: 2,
      },
      {
        label: "Mauna Loa CO2 pitoisuus kuukausittain",
        data: elements.dataMonth,
        borderColor: "rgb(230, 150, 15)",
        backgroundColor: "rgb(230, 150, 15)",
        parsing: {
          xAxisKey: "decimalDate",
          yAxisKey: "average",
        },
        pointRadius: 1,
      },
      {
        label: "Ihmisten aiheuttamia tapahtumia",
        data: elements.v10,
        borderColor: "rgb(20, 80, 50)",
        backgroundColor: "rgb(20, 150, 50)",
        hidden: false,
        showLine: false,
        parsing: {
            xAxisKey: "year",
            yAxisKey: "years_ago"
        },
        pointRadius: 8
      },
      {
        label: "DE08 jääkairausnäyte",
        data: elements.v4_1,
        borderColor: "rgb(237, 9, 44)",
        backgroundColor: "rgb(237, 9, 44)",
        hidden: false,
        showLine: true,
        parsing: {
            xAxisKey: "air_age",
            yAxisKey: "co2_ppm"
        },
        pointRadius: 2
      },
      {
        label: "DE08-2 jääkairausnäyte",
        data: elements.v4_2,
        borderColor: "rgb(2,190,196)",
        backgroundColor: "rgb(2,190,196)",
        hidden: false,
        showLine: true,
        parsing: {
            xAxisKey: "air_age",
            yAxisKey: "co2_ppm"
        },
        pointRadius: 2
      },
      {
        label: "DSS jääkairausnäyte",
        data: elements.v4_3,
        borderColor: "rgb(196,2,154)",
        backgroundColor: "rgb(196,2,154)",
        hidden: false,
        showLine: true,
        parsing: {
            xAxisKey: "air_age",
            yAxisKey: "co2_ppm"
        },
        pointRadius: 2
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
        text: "Mauna Loan CO2 pitoisuuden mittaukset sekä Law Domen kairauksiin perustuvat historialliset CO2 pitoisuudet",
        font: {
          size: 20
        }
      },
      tooltip: {
        callbacks: {
          label: function(context){
            if(context.dataset.label === "Ihmisten aiheuttamia tapahtumia"){
              return context.raw.clean_desc_fi
            }

            if(context.dataset.label === "CO2 pitoisuus kuukausittain" || context.dataset.label === "CO2 pitoisuus vuosittain"){
              return context.formattedValue + " ppm"
            }

            return context.parsed.y + " ppm"
          },
          title: function(context){
            if(!context){
              return
            }
            if(context[0].dataset.label === "CO2 pitoisuus kuukausittain"){
              return context[0].raw.time;
            }

            if(context[0].dataset.label === "CO2 pitoisuus vuosittain"){
              return context[0].raw.year
            }
            
            return context[0].parsed.x
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        max: 2021
      },
      y: {
        type: "linear",
      },
      
    },
  }

  return (
    <>
      <div className="container-fluid">
        <Line data={data} options={options} alt="Anomaly data chart"/>
      </div>
      <div className="card mt-4" style={{width: "38rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          <p className="card-text">Viivakaaviossa ilmakehän hiilidioksidipitoisuuksia (ppm) perustuen Mauna Loalla tehtyihin mittauksiin vuosilta 1958-2021.</p>
          <p className="card-text">Sekä Law Dome kairauksiin perustuvat hiilidioksidipitoisuuksien määrät (ppm) aikajaksoilta 948-1948</p>
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <div>
            <a href="https://gml.noaa.gov/ccgg/trends/" target="_blank" rel="noreferrer noopener" className="card-link">Mauna Loa CO2 data</a>
            <a href="https://gml.noaa.gov/ccgg/about/co2_measurements.html" target="_blank" rel="noreferrer noopener" className="card-link">Mauna Loa selitys</a>
          </div>
          <div>
            <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat" target="_blank" rel="noreferrer noopener" className="card-link">Law Dome CO2 data</a>
            <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html" target="_blank" rel="noreferrer noopener" className="card-link">Law Dome selitys</a>
          </div>
          <a href="https://www.southampton.ac.uk/~cpd/history.html" target="_blank" rel="noreferrer noopener" className="card-link">Ihmistapahtumat</a>
        </div>
      </div>
    </>
  );
}
