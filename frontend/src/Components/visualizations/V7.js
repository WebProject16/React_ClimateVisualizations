import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V7(props) {
    const [elements, setElements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Get("/charts/v7", (res) => 
        {
            if(res.status === 200){
                setElements(res.data)
                setIsLoading(false)
            }else{
                console.log("Error: ", res)
            }
        })
    }, [])

    const data = {
        datasets: [
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
            pointRadius: 13
          },
          {
            label: "Hiilidioksidin määrä (ppm)",
            data: elements.v7_co2,
            borderColor: "rgb(200, 80, 50)",
            backgroundColor: "rgb(200, 80, 50)",
            hidden: false,
            parsing: {
                xAxisKey: "year",
                yAxisKey: "co2"
            },
            yAxisID: 'co2',
            pointRadius: 0
          },
          {
            label: "Maapallon pintalämpötilan keskimuutos",
            data: elements.v7_temp,
            borderColor: "rgb(50, 80, 200)",
            backgroundColor: "rgb(50, 80, 200)",
            hidden: false,
            parsing: {
                xAxisKey: "year",
                yAxisKey: "p50"
            },
            pointRadius: 0
          }
        ]
    }
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
        position: "top",
        },
        title: {
          display: true,
          text: "Mailmanlaajuisen lämpötilan evoluutio viimeiseltä 2-miljoonalta vuodelta",
          font: {
            size:"20"
          },
        },
        tooltip: {
          callbacks: {
            label: function(context){
              let label = context.dataset.label || ''
              

              if(context.dataset.label === "Ihmisten aiheuttamia tapahtumia"){
                label = context.raw.clean_desc_fi
              }

              if(context.dataset.label === "Maapallon pintalämpötilan keskimuutos"){
                label = context.formattedValue + "°C"
              }

              if(context.dataset.label === "Hiilidioksidin määrä (ppm)"){
                label = context.formattedValue + " ppm"
              }

              return label
            },
            title: function(context){
              if(context[0].parsed.x && context[0].parsed.x < 0)
                return context[0].parsed.x * -1 + "k vuotta sitten"
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            callback: function(value) {
              return -value;
            }
          },
          type: "linear",
          title: {
          display: true,
          text:"Vuosia sitten (kyr BP/tuhansina vuosina)"
          },    
        },
        yAxis: {
        type: "linear",
        position: "right",
        title: {
            display: true,
            text:"Lämpötilan muutos C"
        }
        },
        co2: {
          type: "linear",
          position: "left",
          min: 150,
          max: 400,
          title: {
            display: true,
            text:"co2 ppm"
          }
        },
      },
    }


  return (
    <div className="child">
      <div className="container-fluid">{isLoading ? (<p>Odota kun sivua ladataan</p>) :
        (<Line data={data} options={options} alt="Maailmanlaajuisen lämpötilan evoluutio viimeiseltä 2-miljoonalta vuodelta"/>)}
      </div>
      <div className="card mt-4" style={{width: "32rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          {
            !props.description ?
              <div>
                <p className="card-text">Kuvaajan sininen käyrä on kahden miljoonan vuoden ajalta vuosittainen maailmanlaajuinen lämpötilan poikkeaman jälleenrakennus (maapallon pintalämpötilan keskimuutos)</p>
                <p className="card-text">Oranssi käyrä 800-tuhannen vuoden ajalta ilmakehän co2 pitoisuuden jälleenrakennus (hiilidioksidin määrä (ppm))</p>
              </div>
            : <div>
              <p>{props.description}</p>
            </div>
          }
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukon kuvaus</a>
          <a href="http://carolynsnyder.com/publications.php" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukko</a>
          <a href="https://www.southampton.ac.uk/~cpd/history.html" target="_blank" rel="noreferrer noopener" className="card-link">Ihmistapahtumat</a>
        </div>
      </div>
    </div>
  )
}
