export const createItemList = (packItems, shelves) => {
  const itemsList = packItems.reduce((list, item, i) => {
    list[shelves[i]] = item
    return list
}, {});

 return itemsList
}


export const getShelfItems = (shelfName, itemId, itemList) => {
  const items = itemList[shelfName]
  for(const itemName in items) {
    if(items[itemName].id === itemId) {
      delete items[itemName]
    }
  }
  return items; 
}

export const calculatePackWeight = (allShelfItems) => {
  const packItemsList = Object.values(allShelfItems)
  const weight = packItemsList.reduce((total, shelfItems) => {
    if(Object.keys(shelfItems).length) {
      const items = Object.values(shelfItems)
        items.forEach(item => {
          total += Number(item.weight);
      });
    }
    return total
  }, 0);
  
  return weight
}

