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
    shelfList.push({[currentShelf]: shelfTotal.toFixed(2)}) 
    return shelfList
  }, []);
  
  return shelfInfo
}

export const updateShelfWeight = (shelves, shelfName, weight, amount) => {
  const weightToAdd = parseFloat(weight * amount); 
  const updatedShelves = shelves.map(shelf => {
     const currentShelfName = Object.keys(shelf)[0]
    if(currentShelfName === shelfName) {
       shelf[shelfName] = (parseFloat(shelf[shelfName]) + weightToAdd).toFixed(2);
       return shelf;
    }
    return shelf; 
  })
  return updatedShelves ;
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

export const checkShelves = (shelves, shelfName) => {
  const shelfNames = shelves.map(shelf => {
    const shelfName =  Object.keys(shelf);
    return shelfName[0]; 
  })
  if(shelfNames.includes(shelfName.toLowerCase())) {
    return true;
  }
  return false; 

}

export const removeShelf = (shelfName, shelves) => {
  const removedShelfIndex = shelves.findIndex(shelf => {
    const currentShelfName =  Object.keys(shelf)[0]
    return currentShelfName === shelfName
  });
  shelves.splice(removedShelfIndex, 1)
  return shelves; 
}



