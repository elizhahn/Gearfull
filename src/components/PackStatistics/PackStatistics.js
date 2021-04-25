import  React from "react";
import ShelfStatistics from "../ShelfStatistics/ShelfStatistics";
import  backpackerImg  from "../../assets/pinpng.com-mountain-icon-png-169757.png";


const PackStatistics = ({ packWeight, shelves }) => {
  const packWeightOz = packWeight.toFixed(2)
  const packWeightLbs = (packWeight/ 16).toFixed(2)
  return (
    <aside className="statistics" data-cy="statistics-box">
      <h1 className="statistics-title">Base Weight</h1>
      <article className="statistics-container">
        <div className="statistics-totals-container">
          <ul className="statistics-totals">
            <li>
              <span 
                className="total total-ozs" data-cy="pack-weight-oz">
                  {packWeightOz} Oz
              </span>
            </li>
            <li>
              <span 
                className="total total-lbs" data-cy="pack-weight-lbs">
                  {packWeightLbs} Lbs
              </span>
            </li>
          </ul>
          <img className="statistics-backpacker-img"  src={backpackerImg} alt="backpacker climbing silhouette"/>
        </div>
        <ShelfStatistics shelves={shelves}/>
      </article>
    </aside>
  )
}
 

export default PackStatistics