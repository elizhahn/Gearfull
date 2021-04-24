import React from "react";

const ShelfStatistics = ({ shelves }) => {
  const shelfWeights = shelves.map((shelf, i) => {
    const shelfWeightInfoOz = Object.entries(shelf).flat()
    const shelfWeightInfoLbs = (shelfWeightInfoOz[1] / 16).toFixed(2); 
    return (
      <li 
        key={i}
        className="statistics-category"
      >
          <span className="statistics-category-name">{shelfWeightInfoOz[0]}:</span>
          <span className="statistics-category-oz" data-cy="shelf-weight-oz">{shelfWeightInfoOz[1]} Oz</span> | 
          <span className="statistics-category-lbs" data-cy="shelf-weight-lb">  {shelfWeightInfoLbs} Lbs </span>
      </li>
    )
  })
  return (
    <div className="statistics-category-container">
      <h2 className="statistics-category-title">The Breakdown</h2>
      <ul className="statistics-category-list">
        {shelfWeights}
      </ul>
    </div>
  )
}

export default ShelfStatistics; 