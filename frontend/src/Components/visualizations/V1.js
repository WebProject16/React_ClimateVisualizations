import React, {useEffect, useState} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V1() {
  
  const [dataYear, setDataYear] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataV2, setDataV2 ] = useState([]);

  const [v2IsVisible, setV2IsVisible] = useState([]);
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    Get("/charts/v1", (res) => 
    {
      if(res.status === 200){
        setDataV2(res.data.dataV2)
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
      },
      {
        label:v2IsVisible ? "Northern temperature reconstruction" : "",
        data: dataV2,
        borderColor: v2IsVisible ?  "rgb(100, 0, 0)" : "rgba(0,0,0,0)",
        backgroundColor: v2IsVisible ?  "rgb(100, 0, 0)" : "rgba(0,0,0,0)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "T",
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
        <button onClick={() => setV2IsVisible(!v2IsVisible)} className="btn btn-outline-primary mt-4">{v2IsVisible ? "Hide northern temp reconstruction" : "Show northern temp reconstruction"}</button>
      </div>
      <div className="container-fluid">
        <button onClick={() => setIsAnnual(!isAnnual)} className="btn btn-outline-primary mt-2">{isAnnual ? "Show monthly data" : "Show yearly data"}</button>
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Data description</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <h6 className="card-subtitle mt-2 text-muted">Sources:</h6>
          <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" className="card-link">Met Office Hadley Centre</a>
          <a href="https://bolin.su.se/data/moberg-2012-nh-1?n=moberg-2005" target="_blank" className="card-link">Stockholm University</a>
        </div>
      </div>
    </>
  );
}
