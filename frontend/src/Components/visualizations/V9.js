import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V9(props) {
  
  const [viewData1, setViewData1] = useState([]);
  const [viewData2, setViewData2] = useState([]);
  const [viewData3, setViewData3] = useState([]);

  useEffect(() => {
    Get("/charts/v9", (res) => 
    {
      if(res.status === 200){

        const data = res.data;

        setViewData1(data.v9_1);
        setViewData2(data.v9_2);
        setViewData3(data.v9_3);

        console.log(data.v9_1)
        console.log(data.v9_2)
        console.log(data.v9_3)

      }else{
        console.log("Error: ", res)
      }
    })
  }, [])

  /* const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgb(255, 99, 132.2)',
          'rgb(54, 162, 235.2)',
          'rgb(255, 206, 86.2)',
          'rgb(75, 192, 192.2)',
          'rgb(153, 102, 255.2)',
          'rgb(255, 159, 64.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 1,
      },
    ]
  } */

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
            size: 10.5
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
        <Pie options={options} data={data} alt="Piirakkakaavio toimialojen hiilidioksidipäästöistä."/>
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          {
            !props.description ?
              <div>
                <p className="card-text"></p>
                <p className="card-text"></p>
              </div>
            : <div>
              <p>{props.description}</p>
            </div>
          }
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://essd.copernicus.org/articles/14/1917/2022" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukon kuvaus</a>
          <a href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukon lähteet</a>
        </div>
      </div>
    </div>
  );
}
