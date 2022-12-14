import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    const visualizationCards = [
        {route: "/v1", title:"1850-2022 lämpötilan poikkeamat", description:"", image:"/img/v1.png"},
        {route: "/v3", title:"Mauna Loa & Law Dome CO2-pitoisuudet", description:"", image:"/img/v3.png"},
        {route: "/v5", title:"Ilmakehän CO2-pitoisuus (400t vuotta)", description:"", image:"/img/v5.png"},
        {route: "/v6", title:"Ilmakehän CO2-pitoisuus (800t vuotta)", description:"", image:"/img/v6.png"},
        {route: "/v7", title:"Lämpötilan evoluutio", description:"", image:"/img/v7.png"},
        {route: "/v8", title:"CO2-päästöt maittain", description:"", image:"/img/v8.png"},
        {route: "/v9", title:"CO2-päästöt toimialoittain", description:"", image:"/img/v9.png"}
    ]

    const visualizations = visualizationCards.map((nav) =>

            <div key={nav.route} className="col-sm-4 mb-2 cardWrapper">
                <div className="card">
                    <img className="card-img-top" src={nav.image} alt="chart"/>
                    <div className="card-body">
                        <h5 className="card-title">{nav.title} </h5>
                        <p className="card-text">{nav.description}</p>
                        <Link to={nav.route} className="btn btn-primary ">Avaa</Link>
                    </div>
                </div>
            </div>
    )

    return (
    <>
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Visualisaatiot</h4>
                <p className="card-text">Sivullamme voit tutkia monia eri visualisaatioita, jotka kertovat esimerkiksi lämpötilojen poikkeamista vuosituhansien varrelta tai vaikkapa oman maasi hiilidioksidipäästöt. Rekisteröidy ja voit heti luoda oman mukautetun visualisaatiosi parilla klikkauksella!</p>
            </div>
        </div>
        <div className='container mt-4'>
            <div className="row mb-2">
                {visualizations}
            </div>
        </div>
    </>
    )
}