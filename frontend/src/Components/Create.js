import { React, useState } from 'react';
import { AuthPost } from '../API/request';
import { Link } from 'react-router-dom';

export default function Create() {

    const [viewData, setViewData] = useState([]);
    const [isParallel, setIsParallel] = useState(true);
    const [description, setDescription] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const createView = (e) => {
        e.preventDefault();

        if(viewData.length === 0) {
            setIsSuccess(false);
            return setError("Visuaalisaatioita ei ole valittu")
        }

        if(description.length > 1024) {
            setIsSuccess(false);
            return setError("Kuvaus on liian pitkä")
        }

        const uniqueViews = viewData.filter((data, i) => {
            return viewData.indexOf(data) === i;
        })

        const body = {
            views: uniqueViews.toString(),
            isParallel: isParallel,
            description: description
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

    return (
        
        <div className="d-flex justify-content-center">
                    
            <form onSubmit={createView}>
                <h3>Valitse visuaalisaatiot jotka halua näyttää</h3>

                <div className="p-4">
                    <select className="form-select viewSelector" name="views" onClick={e => {setViewData(viewData => [...viewData, e.target.value]); setError("")}} multiple>
                        <option value="v1">1850-2022 lämpötilan poikkeamat</option>
                        <option value="v3">Mauna Loa sekä Law Dome hiilidioksidipitoisuudet</option>
                        <option value="v5">Ilmakehän hiilidioksidipitoisuudet</option>
                        <option value="v6">v6 page</option>
                        <option value="v7">Lämpötilan evoluutio</option>
                        <option value="v8">Hiilidioksidipäästöt maittain</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="basicDescription" className="form-label">Kuvaus</label>
                    <textarea className="form-control" id="basicDescription" rows="4" onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <div className="d-flex justify-content-center text-center">

                    <div>
                        <h4>Kaavioiden asettelu</h4>

                        <div className="row">
                            <div className="col">
                                <input type="radio" className="btn-check" name="isParallel" id="isParallelSw"  defaultChecked={isParallel}></input>
                                <label className="btn btn-outline-dark" htmlFor="isParallelSw" onClick={() => setIsParallel(true)}>Vierekkäin</label>
                            </div>

                            <div className="col">
                                <input type="radio" className="btn-check" name="isParallel" id="isNonParallelSw" defaultChecked={!isParallel}/>
                                <label className="btn btn-outline-dark" htmlFor="isNonParallelSw" onClick={() => setIsParallel(false)}>Allekkain</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-4">Luo näkymä</button>

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