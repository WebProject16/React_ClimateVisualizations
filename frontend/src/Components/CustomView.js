import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Get } from "../API/request";
import V1 from './visualizations/V1';
import V5 from './visualizations/V5';
import V8 from './visualizations/V8';

export default function CustomView() {

    const { url } = useParams();

    const [isSuccess, setIsSuccess] = useState(true);
    const [isParallel, setIsParallel] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [description, setDescription] = useState("");
    const [creator, setCreator] = useState("");

    const validViews = {
        v1: <V1/>,
        v5: <V5/>,
        v8: <V8/>
    }

    useEffect(() => {
        Get("/views/" + url, res => {

            if(res.status === 200){

                setIsSuccess(true);

                const data = res.data.view;

                console.log(data);

                setIsParallel(data.isParallel);
                setViewData(data.visualizations.split(","));
                setDescription(data.description);
                setCreator(data.creator);

            }else{
                setIsSuccess(false);
                console.log(res.response.data);
            }
        })
    }, [])

    if(!isSuccess){
        return (
            <div className="alert alert-info p-4 pb-2">
                <h2>404 Visuaalisaatiota ei löytynyt</h2>
                <p>Palaa takaisin<Link className="alert-link text-decoration-none"to="/"> kotisivulle</Link></p>
            </div>
        )
    }
    
    return (
        <>
            <div className={"viewContainer " + (isParallel ? "parallel" : "nonParallel")}>
            {
                viewData.map(view =>
                    validViews[view]
                )
            }
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <p>{description}</p>
                    <p>Kokoelman tehnyt: {creator}</p>
                </div>
            </div>
        </>
    )
}
