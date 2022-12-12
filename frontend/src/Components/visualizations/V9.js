import React, { useEffect, useState, useRef} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Pie, getElementsAtEvent } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V9(props) {
  
  const [viewData1, setViewData1] = useState([]);
  const [viewData2, setViewData2] = useState([]);
  const [viewData3, setViewData3] = useState([]);

  const chartRef = useRef();

  useEffect(() => {
    Get("/charts/v9", (res) => 
    {
      if(res.status === 200){

        const data = res.data;

        setViewData1(data.v9_1);
        setViewData2(data.v9_2);
        setViewData3(data.v9_3);

      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  const changeData = (e) => {
    const idx = getElementsAtEvent(chartRef.current, e)["0"].index;

    console.log(viewData1[idx].sector)
  }

  const data = {
    labels: viewData1.map(label => label.sector),
    datasets: [
      {
        data: viewData1.map(label => label.share),
        backgroundColor: [
          'rgb(240, 173, 78)',
          'rgb(41, 43, 44)',
          'rgb(2, 117, 216)',
          'rgb(92, 184, 92)'
        ]
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
        <Pie options={options} data={data} ref={chartRef} onClick={changeData} alt="Piirakkakaavio toimialojen hiilidioksidipäästöistä."/>
      </div>
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
