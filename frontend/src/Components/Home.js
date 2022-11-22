import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    const visualizationCards = [
        {route: "/v1", title:"V1", description:"Pohjoiset, eteläiset ja maailmanlaajuiset lämpötilapoikkeamat vuosilta 1850-2022", image:"/img/chart.png"},
        {route: "/v2", title:"V2", description:"Visuaalisaatio 2", image:"/img/chart.png"},
        {route: "/v3", title:"V3", description:"Visuaalisaatio 3", image:"/img/chart.png"},
        {route: "/v4", title:"V4", description:"Visuaalisaatio 4", image:"/img/chart.png"},
        {route: "/v5", title:"V5", description:"Visuaalisaatio 5", image:"/img/chart.png"},
        {route: "/v6", title:"V6", description:"Visuaalisaatio 6", image:"/img/chart.png"},
        {route: "/v7", title:"V7", description:"Visuaalisaatio 7", image:"/img/chart.png"}
    ]

    const visualizations = visualizationCards.map((nav) =>

            <div key={nav.route} className="col-sm-4 mb-2">
                <div className="card">
                    <img className="card-img-top" src='/img/chart.png'alt="chart"/>
                    <div className="card-body">
                        <h5 className="card-title">{nav.title} </h5>
                        <p className="card-text">{nav.description}</p>
                        <Link to={nav.route} className="btn btn-primary">Linkki</Link>
                    </div>
                </div>
            </div>
    )

    return (
    <>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Tervetuloa! </h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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