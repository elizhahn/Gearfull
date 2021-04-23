import React from "react";

const ShelfStatistics = ({ shelves }) => {
  const shelfWeights = shelves.map((shelf, i) => {
    const shelfWeightInfo = Object.entries(shelf).flat()
    return (
      <li 
        key={i}
        className="statistics-category"
      >
          <span className="statistics-category-title">{shelfWeightInfo[0]}:</span>{shelfWeightInfo[1]} 
      </li>
    )
  })
  return (
    <div className="statistics-category-container">
      <h2>The Breakdown</h2>
      <ul className="statistics-category-list">
        {shelfWeights}
      </ul>
    </div>
  )
}

export default ShelfStatistics; 