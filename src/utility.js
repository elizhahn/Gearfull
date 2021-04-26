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

export const updateShelfWeight = (shelves, shelfName, weight, amount, action) => {
  const weightToAdd = parseFloat(weight * amount); 
  const updatedShelves = shelves.map(shelf => {
     const currentShelfName = Object.keys(shelf)[0]
    if(currentShelfName === shelfName && action) {
       shelf[shelfName] = (parseFloat(shelf[shelfName]) + weightToAdd).toFixed(2)
       return shelf;
    } 
    if(currentShelfName === shelfName && !action) {
      shelf[shelfName] = (parseFloat(shelf[shelfName]) - weightToAdd).toFixed(2)
       return shelf;
    }   
    return shelf; 
  })
  return updatedShelves ;
}


export const updateShelfItems = (shelfName, itemId, itemList) => {
  const items = itemList[shelfName]
  for(const itemName in items) {
    if(items[itemName].id === itemId) {
      delete items[itemName]
    }
  }
  return items; 
}

export const updateItemList = (items, shelfName) => {
  for( const item in items) {
    if(item === shelfName) {
      delete items[item]
    }
  }
  return items
}

export const calculatePackWeight = (shelves) => {
  const packWeight = shelves.reduce((totalWeight, shelf) => {
    const shelfWeight = parseFloat(Object.values(shelf).flat()[0]); 
    totalWeight += shelfWeight; 
    return totalWeight
  }, 0);
  return packWeight; 
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



