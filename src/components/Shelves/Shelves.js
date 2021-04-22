import { React, Component } from "react";
import { addItem, getItems, getShelves, removeItem } from "../../ApiCalls";
import { getShelfItems } from "../../utility";
import ShelfCard from "../ShelfCard/ShelfCard";



class Shelves extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: [],
      items: {},
      error: ""
    }
  }

  componentDidMount() {
    getShelves()
    .then(shelves => {
      this.setState({shelves: [...this.state.shelves, ...shelves.baskets]})
    })
    .then(() => getItems(this.state.shelves))
    .then(items => {
      const itemsList = items.reduce((list, item, i) => {
          list[this.state.shelves[i]] = item
          return list
      }, {})
      this.setState({items: itemsList})
    })
   .catch(error => {
     this.setState({error: "There was a problem loading your items"})
   });
    
  }
//For later development
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

  updateItems = (shelfName, itemAdded) => {
    addItem(shelfName, itemAdded)
    .then(data => {
      this.setState({
        items: {...this.state.items, [shelfName]: data}
      })
    })
    .catch(error => {
      this.setState({error: "We're sorry, that item cannot be added, please try something else"})
    })
  }

  deleteItem = (shelfName, itemId) => {
    const updatedItems = getShelfItems(shelfName, itemId, this.state.items);
    removeItem(shelfName, updatedItems)
    .then(data => {
       this.setState({items: {...this.state.items, [shelfName]: updatedItems}})
    })
    .catch(error => {
      this.setState({error: "We're sorry, we cannot remove this item right now, please try again later"})
    })
  }

  render() {
  console.log(this.state)
  const shelves = this.state.shelves.map((shelf, i) => {
    return <ShelfCard
    key={i}
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
        {this.state.error && <p>{this.state.error}</p>}
        {shelves}
      </section>
      <aside className="statistics-container">
        <p>This will be the weight box</p>
      </aside>
    </main>

  )
}
}

export default Shelves;