import React, { useEffect, useState, useRef} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Pie, getElementsAtEvent } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V9(props) {
  
  const [firstPieChartData, setFirstPieChartData] = useState([]);
  const [secondPieChartData, setSecondPieChartData] = useState({});
  const [thirdPieChartData, setThirdPieChartData] = useState({});
  const [chartData, setChartData] = useState([]);

  const [colors, setColors] = useState([]);

  const [chartSector, setChartSector] = useState("");

  const chartRef = useRef();

  useEffect(() => {
    Get("/charts/v9", (res) => 
    {
      if(res.status === 200){

        const data = res.data;

        setFirstPieChartData(data.v9_1);
        setSecondPieChartData(data.v9_2);
        setThirdPieChartData(data.v9_3);

        setChartData(data.v9_1);

        setColors([
          "rgb(2, 117, 216)",
          "rgb(92, 184, 92)",
          "rgb(91, 192, 222)",
          "rgb(240, 173, 78)",
          "rgb(41, 43, 44)",
          "rgb(217, 83, 79)",
          "rgb(163, 117, 84)"
        ])

      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const changeChart = (e) => {
    const idx = getElementsAtEvent(chartRef.current, e)["0"].index;
    const value = getElementsAtEvent(chartRef.current, e)["0"].element.$context.raw;

    let chart = null;

    if(firstPieChartData[idx].share === value){
      chart = secondPieChartData[firstPieChartData[idx].sector];
      setChartSector(firstPieChartData[idx].sector);

    } else if(secondPieChartData[chartSector][idx].share === value){
      chart = thirdPieChartData[secondPieChartData[chartSector][idx].sector];
    }

    if(chart !== null){
      console.log("toimee");
      setChartData(chart);
    }else{
      console.log("asdasd");
    }
    
  }

  const data = {
    labels: chartData.map(label => label.sector),
    datasets: [
      {
        data: chartData.map(label => label.share),
        backgroundColor: colors
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: "Maakohtaiset CO2 päästöt",
        font: {
          size:"20"
        }
      }
    }
  }

  return (
    <div className="child">
      <div className="container-fluid" id="v9Wrapper">
        <Pie options={options} data={data} ref={chartRef} onClick={changeChart} alt="Piirakkakaavio toimialojen hiilidioksidipäästöistä."/>
      </div>
      <button className="btn btn-outline-primary" onClick={() => setChartData(firstPieChartData)}>Reset</button>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          {
            !props.description ?
              <div>
                <p className="card-text">Piirakkakaaviosta näkyy eri toimialojen hiilidioksidipäästöt.</p>
              </div>
            : <div>
              <p>{props.description}</p>
            </div>
          }
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukon kuvaus</a>
          <a href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukon lähteet</a>
        </div>
      </div>
    </div>
  );
}
