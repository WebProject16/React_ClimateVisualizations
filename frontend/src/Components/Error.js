import React from 'react'
import { Link } from 'react-router-dom';

export default function Error() {

  return (
    <div className="alert alert-warning p-4 pb-2">
      <h2>404 Sivua ei löytynyt</h2>
      <p>Palaa takaisin<Link className="alert-link text-decoration-none"to="/"> kotisivulle</Link></p>
    </div>
  )
}
