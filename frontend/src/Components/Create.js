import React, { useState } from "react";
import { AuthPost } from '../API/request';
import { Link } from 'react-router-dom';

export default function Create() {

    const [viewData, setViewData] = useState([]);
    const [isParallel, setIsParallel] = useState(true);
    const [title, setTitle] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [descriptions, setDescriptions] = useState({});

    const preventDupes = (e) => {

        if(viewData.indexOf(e.target.value) > -1) {
            return;
        }else{
            setViewData(viewData => [...viewData, e.target.value])
        }

        setError("");
    }

    const createView = (e) => {
        e.preventDefault();

        if(viewData.length === 0) {
            setIsSuccess(false);
            return setError("Visuaalisaatioita ei ole valittu")
        }

        if(title.length > 128) {
            setIsSuccess(false);
            return setError("Otsikko on liian pitkä")
        }

        if(title.length < 3) {
            setIsSuccess(false);
            return setError("Otsikko on liian lyhyt")
        }

        for (const desc in descriptions) {
            if(descriptions[desc].length > 512){
                return setError(`Kaavion "${titles[desc]}" kuvaus on liian pitkä`)
            }
        }

        const body = {
            views: viewData.toString(),
            isParallel: isParallel,
            title: title,
            descriptions: descriptions
        }

        AuthPost("/views", body, (res) => {
            if(res.status === 201){
                setUrl(res.data.url);

                setIsSuccess(true);
            }else{
                setIsSuccess(false);
                setError(res.response.data.msg);
            }
        })

        setViewData([]);
    }

    const handleDescriptions = (e, row) => {
        let oldDescs = descriptions;

        oldDescs[row] = e.target.value;

        setDescriptions(oldDescs)
    }

    const options = [
        {
            value:"v1",
            title:"1850-2022 lämpötilan poikkeamat"
        },
        {
            value:"v3",
            title:"Mauna Loa sekä Law Dome hiilidioksidipitoisuudet"
        },
        {
            value:"v5",
            title:"Ilmakehän hiilidioksidipitoisuudet"
        },
        {
            value:"v6",
            title:"v6 page"
        },
        {
            value:"v7",
            title:"Lämpötilan evoluutio"
        },
        {
            value:"v8",
            title:"Hiilidioksidipäästöt maittain"
        }
    ]

    const titles = {
        v1: "1850-2022 lämpötilan poikkeamat",
        v3: "Mauna Loa sekä Law Dome hiilidioksidipitoisuudet",
        v5: "Ilmakehän hiilidioksidipitoisuudet",
        v6: "v6 page",
        v7: "Lämpötilan evoluutio",
        v8: "Hiilidioksidipäästöt maittain",
    }

    return (
        
        <div className="d-flex justify-content-center">
                    
            <form onSubmit={createView}>
                <h3>Valitse visuaalisaatiot jotka halua näyttää</h3>

                <div className="mt-4 mb-4">
                    <select className="form-select viewSelector" name="views" onClick={e => preventDupes(e)} multiple disabled={isSuccess}>
                    {
                        options.map(option => {
                            return <option key={option.value}  value={option.value}>{option.title}</option>
                        })
                    }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Otsikko</label>
                    <input className="form-control" id="title" rows="4" onChange={e => setTitle(e.target.value)} disabled={isSuccess} />
                </div>

                {
                    viewData.length > 0 ? <h4 className="text-center mt-2 mb-2">Kirjoita kaaviolle kuvaukset</h4> : null
                }

                {
                    viewData.map((row, i) =>{
                        return (
                            <div className="mb-3" key={row}>
                                <label htmlFor={"desc" + i} className="form-label">{titles[row]}</label>
                                <textarea className="form-control" id={"desc" + i} rows="2" onChange={e => handleDescriptions(e, row)} disabled={isSuccess} />

                                <button className="btn btn-outline-danger mt-2" onClick={() => setViewData(viewData.filter(view => view !== row))} disabled={isSuccess}>Poista</button>
                            </div>
                        )
                    })
                }

                <div className="d-flex justify-content-center text-center">

                    <div>
                        <h4>Kaavioiden asettelu</h4>

                        <div className="row">
                            <div className="col">
                                <input type="radio" className="btn-check" name="isParallel" id="isParallelSw"  defaultChecked={isParallel} disabled={isSuccess} />
                                <label className="btn btn-outline-dark" htmlFor="isParallelSw" onClick={() => setIsParallel(true)}>Vierekkäin</label>
                            </div>

                            <div className="col">
                                <input type="radio" className="btn-check" name="isParallel" id="isNonParallelSw" defaultChecked={!isParallel} disabled={isSuccess} />
                                <label className="btn btn-outline-dark" htmlFor="isNonParallelSw" onClick={() => setIsParallel(false)}>Allekkain</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-4" disabled={isSuccess}>Luo näkymä</button>

                        {
                        isSuccess ?
                        <div className="pt-4">
                            <Link className="btn btn-success p-2 text-decoration-none"to={"/view/" + url}>Linkki näkymään</Link>
                        </div>
                        : null
                        }

                        {
                            !isSuccess && error ?
                            <div className="alert alert-danger mt-4 pb-0">
                                <p>{error}</p>
                            </div>
                            : null
                        }
                    </div>

                </div>
            </form>

        </div>
    )
}