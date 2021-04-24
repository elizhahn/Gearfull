import { React, Component } from "react";
import { addItem, createShelf, getItems, getShelves, removeItem, deleteCurrentShelf } from "../../ApiCalls";
import { calculatePackWeight, createItemList, updateShelfItems, calcItemWeight, calcShelfWeights, removeShelf, updateShelfWeight } from "../../utility";
import ShelfCard from "../ShelfCard/ShelfCard";
import PackStatistics from "../PackStatistics/PackStatistics";
import AddShelfForm from "../AddShelfForm/AddShelfForm";



class Shelves extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: [],
      items: {},
      totalWeight: 0,
      error: ""
    }
  }

  componentDidMount() {
    getShelves()
    .then(shelves => {
      console.log(shelves)
      getItems(shelves.baskets)
      .then(items => {
        console.log(items)
        const itemsList = createItemList(items, shelves.baskets);
        const updatedShelves = calcShelfWeights(items, shelves.baskets);
        const packWeight = calculatePackWeight(updatedShelves);
        this.setState({shelves: updatedShelves, items: itemsList, totalWeight: packWeight})
      })
     .catch(error => {
       this.setState({error: "We can't load your shelves right now, please try again later"})
     });
    })    
  }

  addShelf = (shelfName) => {
    createShelf(shelfName)
    .then(data => {
      const updatedShelves = [{[shelfName]: "0.00"}].concat(this.state.shelves)
      this.setState({shelves: updatedShelves})
    }) 
    .catch(error => console.log(error))
  }

  deleteShelf = (shelfName) => {
    deleteCurrentShelf(shelfName)
    .then(data => {
      const newShelfList = removeShelf(shelfName, this.state.shelves);
      this.setState({shelves: newShelfList})
    })
  }

  updateItems = (shelfName, itemAdded, weight, amount) => {
    const updatedShelves = updateShelfWeight(this.state.shelves, shelfName, weight, amount, true); 
    const itemWeight = calcItemWeight(weight, amount)
    addItem(shelfName, itemAdded)
    .then(data => {
      this.setState({
        items: {...this.state.items, [shelfName]: data}, shelves: updatedShelves,  totalWeight: this.state.totalWeight + itemWeight
      })
    })
    .catch(error => console.log(error))
  }

  deleteItem = (shelfName, itemId, weight, amount) => {
    const updatedShelves = updateShelfWeight(this.state.shelves, shelfName, weight, amount, false); 
    const itemWeight = calcItemWeight(weight, amount); 
    const updatedItemsList = updateShelfItems(shelfName, itemId, this.state.items);
    removeItem(shelfName, updatedItemsList)
    .then(data => {
       this.setState({items: {...this.state.items, [shelfName]: updatedItemsList}, shelves: updatedShelves,  totalWeight: this.state.totalWeight - itemWeight})
    })
    .catch(error => {
      this.setState({error: "We're sorry, we cannot remove this item right now, please try again later"})
    })
  }

  render() {
    const shelfNames = this.state.shelves.map(shelf => {
      return Object.keys(shelf); 
    })
    const shelves = shelfNames.flat().map((shelf, i) => {
    return <ShelfCard
      key={i}
      id={i}
      shelfName={shelf}
      shelfItems={this.state.items[shelf]}
      updateItems={this.updateItems}
      deleteItem={this.deleteItem}
      deleteShelf={this.deleteShelf}
    />
  })
  return (
    <main className="shelves">
      <section className="shelves-container">
        <p className="shelves-intro">Here are some shelves to get you started...</p>
        <AddShelfForm 
          addShelf={this.addShelf}
          shelves={this.state.shelves}
        />
        {this.state.error && <p className="shelves-loading-msg">{this.state.error}</p>}
        {!this.state.error && !this.state.shelves.length && <p className="shelves-loading-msg">Loading shelves...</p>}
        {shelves}
      </section>
      <PackStatistics 
      packWeight={this.state.totalWeight} 
      shelves={this.state.shelves}
      />
    </main>

  )
}
}

export default Shelves;