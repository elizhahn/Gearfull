import React from "react";
import { MdClear } from "react-icons/md";

const ShelfItems = ({ shelfItems, deleteItem, shelfName }) => {
  let itemList;
  if(shelfItems !== undefined) {
    itemList = Object.keys(shelfItems).map((item) => { 
      return (
            <li key={shelfItems[item].id} id={shelfItems[item].id} className="shelf-item" data-cy="added-item">
              <p className="shelf-item-name">{item}</p>
              <p className="shelf-item-quantity">weight: {shelfItems[item].weight}</p>
              <p className="shelf-item-quantity">amount: {shelfItems[item].amount}</p>
              <button 
              className="shelf-item-remove-btn"
              onClick={() => deleteItem(shelfName, shelfItems[item].id, shelfItems[item].weight, shelfItems[item].amount)}
              >
                <MdClear className="shelf-item-remove-icon"/>
              </button>
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