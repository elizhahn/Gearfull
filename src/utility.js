export const createItemList = (packItems, shelves) => {
  const itemsList = packItems.reduce((list, item, i) => {
    list[shelves[i]] = item
    return list
}, {});

 return itemsList
}

export const calcShelfWeights = (packItems, shelves) => {
  const shelfInfo = packItems.reduce((shelfList, shelf, i) => {
    let shelfTotal = 0; 
    const shelfItems = Object.values(shelf);
    shelfItems.forEach(item => {
      shelfTotal += Number(item.weight) * Number(item.amount)
    });
    const currentShelf = shelves[i]; 
    shelfList.push({[currentShelf]: shelfTotal}) 
    return shelfList
  }, []);
  
  return shelfInfo
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
          total += Number(item.weight * item.amount);
      });
    }
    return total
  }, 0);
  
  return weight
}

export const calcItemWeight = (weight, amount) => {
  const weightTotal = Number(weight) * Number(amount); 
  return weightTotal
}

//looking to refactor this
// export const calcShelfWeights = (packItems, shelves) => {
//   const shelfItemList =  Object.values(packItems)
//   const shelfWeights = shelfItemList.reduce((weightList, shelf, i) => {
//    let shelfTotal = 0; 
//    const shelfItems = Object.values(shelf);
//    shelfItems.forEach(item => {
//       shelfTotal += Number(item.weight) * Number(item.amount)
//    });
//     weightList[shelves[i]] = shelfTotal; 
//     return weightList
//   }, {})
//   return shelfWeights 
// }



