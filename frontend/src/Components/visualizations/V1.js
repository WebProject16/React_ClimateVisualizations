import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-luxon";

export default function V1() {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Get("/charts/v1", (res) => {
        if(res.status === 200){
            setChartData(res.data.data)
            console.log(chartData)
        }else{
            console.log("Error: ", res)
        }
    })
  }, [])

  const data = {
    datasets: [
      {
        label: "Global temperature anomaly",
        data: chartData,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        parsing: {
          xAxisKey: "year",
          yAxisKey: "global_anomaly",
        },
        pointRadius: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Time Line Graph Demonstration",
      },
    },
    scales: {
        x: {
          type: "time",
          
        },
        yAxis: {
          type: "linear",
        },
      },
  };

  return (
    <div style={{ width: "600px" }}>
      <Line options={options} data={data} />
    </div>
  );
}