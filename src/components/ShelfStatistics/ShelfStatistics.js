import React from "react";

const ShelfStatistics = ({ shelves }) => {
  const shelfWeights = shelves.map((shelf, i) => {
    const shelfWeightInfoOz = Object.entries(shelf).flat()
    const shelfWeightInfoLbs = (shelfWeightInfoOz[1] / 16).toFixed(2); 
    return (
      <li 
        key={i}
        className="statistics-shelf"
        data-cy="shelf-weight-name"
      >
        <span 
          className="statistics-shelf-name">{shelfWeightInfoOz[0]}:
        </span>
        <span 
          className="statistics-shelf-oz" data-cy="shelf-weight-oz">
            {shelfWeightInfoOz[1]} Oz
        </span> | 
        <span 
          className="statistics-shelf-lbs" data-cy="shelf-weight-lb">  
          {shelfWeightInfoLbs} Lbs 
        </span>
      </li>
    )
  })
  return (
    <div className="statistics-shelf-container">
      <h2 className="statistics-shelf-title">The Breakdown</h2>
      <ul className="statistics-shelf-list">
        {shelfWeights}
      </ul>
    </div>
  )
}

export default ShelfStatistics; 