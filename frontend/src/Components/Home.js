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
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Welcome! </h5>
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