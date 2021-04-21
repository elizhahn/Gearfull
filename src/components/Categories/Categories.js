import { React, Component } from "react";
import { GiRawEgg } from "react-icons/gi";

class Categories extends Component {
  constructor() {
    super() 
    this.state = {
      shelves: ["Big Four", "Cook System", "Clothing", "Hygiene"],
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

  deleteShelf = () => {
    fetch("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/sleepsystem", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      redirect:'follow'
    })
    .then(response => response.text())
    .then(response => {
      console.log(response)
    })
  }

  render() {
  return (
    <section className="categories-container">
      <p className="categories-intro">Here are some shelves to get you started...</p>
    </section>

  )
}
}

export default Categories;