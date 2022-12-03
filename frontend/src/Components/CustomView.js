import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { Get } from "../API/request";

export default function CustomView() {

    const { url } = useParams();

    const [isParallel, setIsParallel] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [description, setDescription] = useState("");
    const [creator, setCreator] = useState("");

    useEffect(() => {
        Get("/views/" + url, res => {
            if(res.status === 200){
                const data = res.data.view;

                console.log(data);

                setIsParallel(data.isParallel);
                setViewData(data.visualizations.split(","));
                setDescription(data.description);
                setCreator(data.creator);

            }else{
                console.log(res);
            }
        })
    }, [])

    const views = viewData.map(view =>
        <h2 key={view}>{view}</h2>
    )

    return (
        <>
          {views}
          <h2>Isparallel: {isParallel}</h2>
          <h2>Creator: {creator}</h2>
          <h2>Description: {description}</h2>
        </>
    )
}
