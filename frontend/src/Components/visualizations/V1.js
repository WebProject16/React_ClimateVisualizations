import React, {useEffect, useState, useRef} from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V1() {
  let dataYear = [];
  let dataMonth = [];
  let dataV2 = [];
  const chartRef = useRef();
  const [dataSets, setDataSets] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ isAnnual, setIsAnnual ] = useState(false);

  useEffect(() => {
    console.log("get data")
    Get("/charts/v1", (res) => 
    {
      if(res.status === 200){
          dataYear.push(res.data.dataYear)
          console.log(dataYear)
        }else{
          console.log("Error: ", res)
        }
    })
        
    SetInfo();
  }, [])

  useEffect(() => {

  }, [isLoading])

  useEffect(() => {
    console.log("data set changed")
    setIsLoading(false);
    if(chartRef.current){
      chartRef.current.render();
      chartRef.current.update();
    }
  }, [dataSets])



  const ToggleV2 = () => {
    console.log("datayear", dataYear)
    console.log("data ")
    console.log("set", dataSets)
  }

  const SetInfo = () => {
    setDataSets({datasets: 
      [
        {
          label: "Global temperature anomaly",
          data: dataYear,
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
          data: dataYear,
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
          data: dataYear,
          borderColor: "rgb(0, 0, 255)",
          backgroundColor: "rgb(0, 0, 255)",
          parsing: {
            xAxisKey: "year",
            yAxisKey: "northern_anomaly",
          },
          pointRadius: 1,
        }
      ]
    })
    setOptions(
      {
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
        }  
      )
      console.log(dataSets)
  }


  return (
    <>
      {isLoading ? (
        <>
          <p>Loading please wait</p>
        </>
      ) : (
        <>
          <div className="container-fluid">
            <Line ref={chartRef} data={dataSets} options={options}/>
            {/* {isAnnual ? (
              <>
                <button onClick={ToggleAnnual} className="btn btn-outline-primary mt-4">Show monthly data</button>
              </>
            ) : (
              <>
                <button onClick={ToggleAnnual} className="btn btn-outline-primary mt-4">Show annual data</button>
              </>
            )} */}
          </div>
          <div className="container-fluid">
            <button className="btn btn-outline-primary mt-2" onClick={ToggleV2}>Toggle v2</button>
          </div>
        </>
      )}
    </>
  );
}
