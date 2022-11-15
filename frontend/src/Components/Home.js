import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    const visualizationCards = [
        {route: "/v1", title:"V1", description:"v1 page", image:"/img/chart.png"},
        {route: "/v2", title:"V2", description:"v2 page", image:"/img/chart.png"},
        {route: "/v3", title:"V3", description:"v3 page", image:"/img/chart.png"},
        {route: "/v4", title:"V4", description:"v4 page", image:"/img/chart.png"},
        {route: "/v5", title:"V5", description:"v5 page", image:"/img/chart.png"},
        {route: "/v6", title:"V6", description:"v6 page", image:"/img/chart.png"},
        {route: "/v7", title:"V7", description:"v7 page", image:"/img/chart.png"}
    ]

    const visualizations = visualizationCards.map((nav) =>

            <div key={nav.route} className="col-sm-4 mb-2">
                <div className="card">
                    <img className="card-img-top" src='/img/chart.png'alt="chart"/>
                    <div className="card-body">
                        <h5 className="card-title">{nav.title} </h5>
                        <p className="card-text">{nav.description}</p>
                        <Link to={nav.route} className="btn btn-primary">Link</Link>
                    </div>
                </div>
            </div>
    )

    return (
    <>
        <div className="card text-center">
            <div className="card-header">
                some gray text over here
            </div>
                <div className="card-body">
                    <h5 className="card-title">Welcome!</h5>
                    <p className="card-text">This text explains our project and all details about it. Components etc and programming languages used. A.K.A our word document.
                    We could also show pictures down below, showing the visualizations etc. Also we will link our github link down here.</p>
                    <a href="https://github.com/WebProject16/React_ClimateVisualizations" className="btn btn-primary">Link to our github</a>
                </div>
            <div className="card-footer text-muted">
                jotain
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