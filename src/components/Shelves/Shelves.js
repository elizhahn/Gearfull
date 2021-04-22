import { React, Component } from "react";
import ShelfCard from "../ShelfCard/ShelfCard";


class Shelves extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: [],
      items: {}
    }
  }

  componentDidMount() {
    fetch("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      redirect:'follow'
    })
    .then(response => response.json())
    .then(shelves => {
      this.setState({shelves: [...this.state.shelves, ...shelves.baskets]})
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

  updateItems = (shelfName, itemAdded) => {
    fetch(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${shelfName}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(itemAdded),
      redirect: "follow"
    })
    .then(response => response.text())
    .then(data => {
      this.setState({
        items: {[shelfName]: [...this.state.items[shelfName], data]}
      })
    })
    .catch(error => console.log(error))
  }

  render() {
  console.log(this.state)
  const shelves = this.state.shelves.map(shelf => {
    return <ShelfCard 
    shelfName={shelf}
    updateItems={this.updateItems}
    />
  })
  return (
    <main className="shelves">
      <section className="shelves-container">
        <p className="shelves-intro">Here are some shelves to get you started...</p>
        {shelves}
      </section>
      <aside>
        <p>This will be the weight box</p>
      </aside>
    </main>

  )
}
}

export default Shelves;