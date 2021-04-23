import React from "react";

const ShelfStatistics = ({ shelves }) => {
  const shelfWeights = shelves.map((shelf, i) => {
    const shelfWeightInfo = Object.entries(shelf)
    return (
      <li key={i}>{shelfWeightInfo[0]}: {shelfWeightInfo[1]}</li>
    )
  })
  return (
    <ul>
      {shelfWeights}
    </ul>
  )
}

export default ShelfStatistics; 