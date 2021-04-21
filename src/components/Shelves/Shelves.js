import { React, Component } from "react";
import ShelfCard from "../ShelfCard/ShelfCard";


class Shelves extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: ["Big Four", "Cook System", "Clothing", "Hygiene"],
      items: {}
    }
  }

  componentDidMount() {
    const categories = this.state.shelves
    categories.forEach(category => {
      fetch(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${category}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: "",
        redirect:'follow'
      })
      .then(response => response.text())
      .then(response => {
        console.log(response)
      })
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

  updateItems = (event, shelfName) => {
    const itemName = this.state.itemName.toLowerCase()
    const itemAdded = {
      itemName: {weight: this.state.weight, amount: this.state.amount}
    }
    event.preventDefault();
    fetch(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${shelfName}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"Zpacks Duplex": "test"}),
      redirect: "follow"
    })
    .then(response => response.text())
    .then(data => {
      console.log("data")
    })
    .catch(error => console.log(error))
  }

  render() {
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