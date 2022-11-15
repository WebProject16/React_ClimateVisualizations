import React from 'react';

export default function Home() {
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

<div className="row">

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 1</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v1" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 2</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v2" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 3</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v3" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 4</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v4" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 5</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v5" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 6</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v6" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

  <div className="col-sm-6">
    <div className="card">
    <img className="card-img-top" src='/img/chart.png'alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Visualization 7</h5>
        <p className="card-text">something here.</p>
        <a href="http://localhost:3000/v7" className="btn btn-primary">Link</a>
      </div>
    </div>
  </div>

</div>


    </>
    )
}