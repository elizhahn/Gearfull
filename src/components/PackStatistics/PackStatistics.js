import  React from "react";
import PropTypes from "prop-types";
import ShelfStatistics from "../ShelfStatistics/ShelfStatistics";


const PackStatistics = ({ packWeight, shelves }) => {
  const packWeightOz = packWeight.toFixed(2)
  const packWeightLbs = (packWeight/ 16).toFixed(2)
  return (
    <aside className="statistics" data-cy="statistics-box">
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
        </div>
        <ShelfStatistics shelves={shelves}/>
      </article>
    </aside>
  )
}
 

export default PackStatistics

PackStatistics.propTypes = {
  packWeight: PropTypes.number.isRequired, 
  shelves: PropTypes.array.isRequired
}