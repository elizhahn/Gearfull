import { React, Component } from "react";
import { getItems, getShelves, removeItem } from "../../ApiCalls";
import { calculatePackWeight, createItemList, getShelfItems, calcItemWeight, calcShelfWeights } from "../../utility";
import ShelfCard from "../ShelfCard/ShelfCard";
import PackStatistics from "../PackStatistics/PackStatistics";



class Shelves extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: [],
      items: {},
      totalWeight: 0
    }
  }

  componentDidMount() {
    getShelves()
    .then(shelves => {
      getItems(shelves.baskets)
      .then(items => {
        const itemsList = createItemList(items, shelves.baskets);
        const updatedShelves = calcShelfWeights(items, shelves.baskets);
        const packWeight = calculatePackWeight(itemsList);
        this.setState({shelves: updatedShelves, items: itemsList, totalWeight: packWeight})
      })
     .catch(error => console.log(error));
    })    
  }

  deleteShelf = (shelfName) => {
    fetch(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${shelfName}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      redirect:'follow'
    })
    .then(response => response.text())
    .then(response => {
      console.log(response)
    })
  }

  updateItems = (shelfName, itemAdded, weight, amount) => {
    const itemWeight = calcItemWeight(weight, amount)
    fetch(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${shelfName}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(itemAdded),
      redirect: "follow"
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        items: {...this.state.items, [shelfName]: data}, totalWeight: this.state.totalWeight + itemWeight
      })
    })
    .catch(error => console.log(error))
  }

  deleteItem = (shelfName, itemId, weight, amount) => {
    const itemWeight = calcItemWeight(weight, amount); 
    const updatedItems = getShelfItems(shelfName, itemId, this.state.items);
    removeItem(shelfName, updatedItems)
    .then(data => {
       this.setState({items: {...this.state.items, [shelfName]: updatedItems}, totalWeight: this.state.totalWeight - itemWeight})
    })
    .catch(error => {
      this.setState({error: "We're sorry, we cannot remove this item right now, please try again later"})
    })
  }

  render() {
    const shelfNames = this.state.shelves.map(shelf => {
      return Object.keys(shelf); 
    })
    const shelves = shelfNames.map((shelf, i) => {
    return <ShelfCard
    key={i}
    id={i}
    shelfName={shelf}
    shelfItems={this.state.items[shelf]}
    updateItems={this.updateItems}
    deleteItem={this.deleteItem}
    />
  })
  return (
    <main className="shelves">
      <section className="shelves-container">
        <p className="shelves-intro">Here are some shelves to get you started...</p>
        {shelves}
      </section>
      <PackStatistics 
      packWeight={this.state.totalWeight} 
      packItems={this.state.items} 
      shelves={this.state.shelves}
      />
    </main>

  )
}
}

export default Shelves;