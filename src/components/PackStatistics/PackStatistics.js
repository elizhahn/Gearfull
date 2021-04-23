import  React from "react";
import  backpackerImg  from "../../assets/pinpng.com-mountain-icon-png-169757.png";


const PackStatistics = ({ packWeight, shelves }) => {
  const packWeightLbs = (packWeight/ 16).toFixed(2)
  const shelfWeights = shelves.map(shelf => {
    const shelfWeightInfo = Object.entries(shelf)
    return (
      <li>{shelfWeightInfo[0]}: {shelfWeightInfo[1]}</li>
    )
  })
  return (
    <aside className="statistics">
      <h1 className="statistics-title">Base Weight</h1>
      <article className="statistics-container">
        <div className="statistics-totals-container">
          <ul className="statistics-totals">
            <li><span className="total total-ozs">{packWeight} Oz</span></li>
            <li><span className="total total-lbs">{packWeightLbs} Lbs</span></li>
          </ul>
          <img className="statistics-backpacker-img"  src={backpackerImg} alt="backpacker climbing silhouette"/>
        </div>
        <ul className="statistics-category-totals">
          {shelfWeights}
        </ul>
      </article>
    </aside>
  )
}
 

export default PackStatistics