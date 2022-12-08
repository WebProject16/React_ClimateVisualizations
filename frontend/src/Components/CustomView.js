import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Get } from "../API/request";
import V1 from './visualizations/V1';
import V3 from './visualizations/V3';
import V5 from './visualizations/V5';
import V6 from './visualizations/V6';
import V7 from './visualizations/V7';
import V8 from './visualizations/V8';

export default function CustomView() {

    const { url } = useParams();

    const [isSuccess, setIsSuccess] = useState(true);
    const [isParallel, setIsParallel] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [descriptions, setDescriptions] = useState([]);

    const validViews = {
        v1: <V1 key="v1" description={descriptions[0]} />,
        v3: <V3 key="v3" description={descriptions[1]} />,
        v5: <V5 key="v5" description={descriptions[2]} />,
        v6: <V6 key="v6" description={descriptions[3]} />,
        v7: <V7 key="v7" description={descriptions[4]} />,
        v8: <V8 key="v8" description={descriptions[5]} />
    }

    useEffect(() => {
        Get("/views/" + url, res => {

            if(res.status === 200){

                setIsSuccess(true);

                const data = res.data.view;
                const views = data.visualizations.split(",");

                setIsParallel(data.isParallel);
                setViewData(views);
                setTitle(data.title);
                setCreator(data.creator);

                const descs = [data.desc1, data.desc2, data.desc3, data.desc4, data.desc5, data.desc6, data.desc7]

                for(let i = 0; i < views.length; i++){
                    setDescriptions(descriptions => [...descriptions, descs[i]])
                }

            }else{
                setIsSuccess(false);
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
            <div className="text-center">
                <h2>{title}</h2>
                <p>Kokoelman tehnyt: {creator}</p>
            </div>
            <div className={"viewContainer " + (isParallel ? "parallel" : "nonParallel")}>
            {
                viewData.map(view =>
                    validViews[view]
                )
            }
            </div>
        </>
    )
}
