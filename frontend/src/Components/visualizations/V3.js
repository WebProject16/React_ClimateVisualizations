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
        label: "CO2 pitoisuus vuosittain",
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
        label: "CO2 pitoisuus kuukausittain",
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
        borderColor: "rgb(20, 80, 50)",
        backgroundColor: "rgb(20, 150, 50)",
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
        borderColor: "rgb(20, 80, 50)",
        backgroundColor: "rgb(20, 150, 50)",
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
        borderColor: "rgb(20, 80, 50)",
        backgroundColor: "rgb(20, 150, 50)",
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
        text: "Mauna Loan CO2 pitoisuuden mittaukset",
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
            console.log(context)
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
