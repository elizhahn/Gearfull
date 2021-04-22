import { React, Component } from "react";
import { getItems, getShelves } from "../../ApiCalls";
import ShelfCard from "../ShelfCard/ShelfCard";
import PackStatistics from "../PackStatistics/PackStatistics";



class Shelves extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: [],
      items: {},
      totalWeight: 0,
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
   .catch(error => console.log(error));
    
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

  updateItems = (shelfName, itemAdded) => {
    fetch(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${shelfName}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(itemAdded),
      redirect: "follow"
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        items: {...this.state.items, [shelfName]: data}
      })
    })
    .catch(error => console.log(error))
  }

  render() {
  console.log(this.state)
  const shelves = this.state.shelves.map((shelf, i) => {
    return <ShelfCard
    key={i}
    shelfName={shelf}
    shelfItems={this.state.items[shelf]}
    updateItems={this.updateItems}
    />
  })
  return (
    <main className="shelves">
      <section className="shelves-container">
        <p className="shelves-intro">Here are some shelves to get you started...</p>
        {shelves}
      </section>
      <aside className="statistics-container">
        <PackStatistics/>
      </aside>
    </main>

  )
}
}

export default Shelves;