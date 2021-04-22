import React from "react";
import { MdClear } from "react-icons/md";

const ShelfItems = ({ shelfItems }) => {
  let itemList;
  if(shelfItems !== undefined) {
    console.log(shelfItems)
    itemList = Object.keys(shelfItems).map((item, i) => { 
      return (
            <li key={i} className="shelf-item">
              <p className="shelf-item-name">{item}</p>
              <p className="shelf-item-quantity">weight: {shelfItems[item].weight}</p>
              <p className="shelf-item-quantity">amount: {shelfItems[item].amount}</p>
              <button className="shelf-item-remove-btn"><MdClear className="shelf-item-remove-icon"/></button>
            </li>
            )    
    }); 
  }
  return (
    <ul className="shelf-item-list">
      {itemList}
    </ul>
  )
}

export default ShelfItems