import React, {useEffect, useState} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V1() {
  
  const [dataYear, setDataYear] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);

  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    Get("/charts/v1", (res) => 
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
          label: "Northern temperature anomaly",
          data: isAnnual ? dataYear : dataMonth,
          borderColor: "rgb(50, 80, 200)",
          backgroundColor: "rgb(50, 80, 200)",
          parsing: {
            xAxisKey: "year",
            yAxisKey: "northern_anomaly",
          },
          pointRadius: 1,
        },
        {
          label: "Southern temperature anomaly",
          data: isAnnual ? dataYear : dataMonth,
          borderColor: "rgb(230, 150, 15)",
          backgroundColor: "rgb(230, 150, 15)",
          parsing: {
            xAxisKey: "year",
            yAxisKey: "southern_anomaly",
          },
          pointRadius: 1,
        },
        {
          label: "Global temperature anomaly",
          data: isAnnual ? dataYear : dataMonth,
          borderColor: "rgb(50, 150, 100)",
          backgroundColor: "rgb(50, 150, 100)",
          parsing: {
            xAxisKey: "year",
            yAxisKey: "global_anomaly",
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
          text: "Temperature anomalies " + (isAnnual ? "(annual)" : "(month)"),
        },
      },
      scales: {
        x: {
          type: "time",
          time:{
            unit: isAnnual ? "year" : "month",
          }
        },
        yAxis: {
          type: "linear",
        },
      },
    }

  return (
    <>
      <div className="container-fluid">
        <Line data={data} options={options} alt="Anomaly data chart"/>
        <button onClick={() => setIsAnnual(!isAnnual)} className="btn btn-outline-primary mt-4">{isAnnual ? "Show monthly data" : "Show yearly data"}</button>
      </div>
    </>
  );
}
