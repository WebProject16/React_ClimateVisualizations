import React, {useEffect, useState} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V1() {

  const [chartData, setChartData] = useState([]);
  const [ isAnnual, setIsAnnual ] = useState(false);
  const [ hasV2, setHasV2 ] = useState(false)

  useEffect(() => {
    Get("/charts/v1", (res) => {
        if(res.status === 200){
            setChartData(res.data)
            setIsAnnual(true)
            setHasV2(true)
        }else{
            console.log("Error: ", res)
        }
    })
  }, [])

  let dataMonth = {
    datasets: [
      {
        label: "Global temperature anomaly",
        data: chartData.dataMonth,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(0, 0, 0)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "global_anomaly",
        },
        pointRadius: 1,
      },
      {
        label:"Southern temperature anomaly",
        data: chartData.dataMonth,
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgb(0, 255, 0)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "southern_anomaly",
        },
        pointRadius: 1,
      },
      {
        label:"Northern temperature anomaly",
        data: chartData.dataMonth,
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "rgb(0, 0, 255)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "northern_anomaly",
        },
        pointRadius: 1,
      }
    ],
  };

  let optionsMonth = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature anomalies",
      },
    },
    scales: {
        x: {
          type: "time",
          time:{
            unit:"month",
          }
        },
        yAxis: {
          type: "linear",
        },
      },
  };

  let dataYear = {
    datasets: [
      {
        label: "Global temperature anomaly",
        data: chartData.dataYear,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(0, 0, 0)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "global_anomaly",
        },
        pointRadius: 1,
      },
      {
        label:"Southern temperature anomaly",
        data: chartData.dataYear,
        borderColor: "rgb(0, 255, 0)",
        backgroundColor: "rgb(0, 255, 0)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "southern_anomaly",
        },
        pointRadius: 1,
      },
      {
        label:"Northern temperature anomaly",
        data: chartData.dataYear,
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "rgb(0, 0, 255)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "northern_anomaly",
        },
        pointRadius: 1,
      }
    ],
  };

  let optionsYear = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature anomalies",
      },
    },
    scales: {
        x: {
          type: "time",
          time:{
            unit:"year",
          }
        },
        yAxis: {
          type: "linear",
        },
      },
  };

  const ToggleAnnual = () => {
    if(isAnnual){
      setIsAnnual(false)
    }else{
      setIsAnnual(true);
    }
  }

  dataMonth.datasets.push({
    label: "Norther hemisphere reconstruction",
    data: chartData.dataV2,
    borderColor: "rgba(255, 0, 0,0.3)",
    backgroundColor: "rgba(255, 0, 0,0.3)",
    parsing: {
      xAxisKey: "year",
      yAxisKey: "T",
    },
    pointRadius: 0,
  })
  dataYear.datasets.push({
    label: "Norther hemisphere reconstruction",
    data: chartData.dataV2,
    borderColor: "rgba(255, 0, 0,0.3)",
    backgroundColor: "rgba(255, 0, 0,0.3)",
    borderWidth: 7,
    parsing: {
      xAxisKey: "year",
      yAxisKey: "T",
    },
    pointRadius: 1,
  })

  const ToggleV2 = () => {
    if(hasV2){
      
      console.log(dataMonth)
    }else{
      console.log(dataMonth)
    }
  }


  return (
    <>
      <div className="container-fluid">
        {isAnnual ? (
          <>
            <Line options={optionsYear} data={dataYear} />
            <button onClick={ToggleAnnual} className="btn btn-outline-primary mt-4">Show monthly data</button>
          </>
        ) : (
          <>
            <Line options={optionsMonth} data={dataMonth} />
            <button onClick={ToggleAnnual} className="btn btn-outline-primary mt-4">Show annual data</button>
          </>
        )}
      </div>
      <div className="container-fluid">
        <button className="btn btn-outline-primary mt-2" onClick={ToggleV2}>Toggle v2</button>
      </div>
    </>
  );
}
