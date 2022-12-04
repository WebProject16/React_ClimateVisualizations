import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Get } from "../../API/request";
import "chartjs-adapter-luxon";

export default function V7() {
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
            label: "Maapallon pintalämpötilan keskimuutos",
            data: elements.v7_temp,
            borderColor: "rgb(50, 80, 200)",
            backgroundColor: "rgb(50, 80, 200)",
            hidden: false,
            parsing: {
                xAxisKey: "kyrBP",
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
            }
            },
        },
        scales: {
            x: {
                type: "linear",
                title: {
                display: true,
                text:"Vuosia sitten (kyr BP/tuhansina vuosina)"
                }
            },
            yAxis: {
            type: "linear",
            title: {
                display: true,
                text:"Lämpötilan muutos C"
            }
            },
        },
    }


  return (
    <>
      <div className="container-fluid">{isLoading ? (<p>Loading please wait</p>) :
        (<Line data={data} options={options} alt="Maailmanlaajuisen lämpötilan evoluutio viimeiseltä 2-miljoonalta vuodelta"/>)}
      </div>
      <div className="card mt-4" style={{width: "24rem"}}>
        <div className="card-body">
          <h5 className="card-title">Kuvaus</h5>
          <p className="card-text"></p>
          <p className="card-text"></p>
          
          <h6 className="card-subtitle mt-2 text-muted">Lähteet:</h6>
          <a href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukon kuvaus</a>
          <a href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2" target="_blank" rel="noreferrer noopener" className="card-link">Tietojoukko</a>
        </div>
      </div>
    </>
  )
}
