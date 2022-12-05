import { React, useState } from 'react';
import { AuthPost } from '../API/request';
import { Link } from 'react-router-dom';

export default function Create() {

    const [viewData, setViewData] = useState([]);
    const [isParallel, setIsParallel] = useState(false);
    const [description, setDescription] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [url, setUrl] = useState("");

    const createView = (e) => {
        e.preventDefault();

        const body = {
            views: viewData.toString(),
            isParallel: isParallel,
            description: description
        }

        AuthPost("/views", body, (res) => {
            if(res.status === 201){
                setUrl(res.data.url)

                setIsSuccess(true)
            }else{
            }
        })

        setViewData([]);
    }

    return (
        
        <div className="d-flex justify-content-center">
                    
            <form onSubmit={createView}>
                <h3>Valitse visuaalisaatiot jotka halua näyttää</h3>

                <div className="p-4">
                    <select className="form-select" name="views" onClick={e => setViewData(viewData => [...viewData, e.target.value])} multiple>
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
                        <div>
                            <input type="checkbox" className="btn-check" name="isParallel" id="isSideBySideSw" />
                            <label className="btn btn-outline-primary" htmlFor="isSideBySideSw" onClick={() => setIsParallel(!isParallel)}>{isParallel ? "Vierekkäin" : "Allekkain"}</label>
                        </div>
                        <button type="submit" className="btn btn-outline-primary mt-4">Tallenna</button>

                        {
                        isSuccess ?
                        <div className="pt-4 mt-4">
                            <Link className="btn btn-success p-3 text-decoration-none"to={"/view/" + url}>Linkki näkymään</Link>
                        </div>
                        :""
                        }
                    </div>

                </div>
            </form>

        </div>
    )
}