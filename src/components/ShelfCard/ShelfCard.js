import { React, Component } from "react";
import ShelfItems from "../ShelfItems/ShelfItems";
import { MdExpandMore } from "react-icons/md";
import { MdAdd } from "react-icons/md";

class ShelfCard extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      itemName: "",
      weight: "",
      amount: "",
      error: "",
      expanded: "collapsed", 
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clearInputs = () => {
    this.setState({itemName: "", weight: "", amount: ""})
  }

  handleSubmit = (event, shelfName) => {
    const itemName = this.state.itemName.toLowerCase()
    const itemAdded = {
      [itemName]: {id: Date.now(), weight: this.state.weight, amount: this.state.amount}
    }
    event.preventDefault()
    if(!this.state.itemName || !this.state.weight || !this.state.amount) {
      this.setState({error: "Please fill out all the fields"})
  } else {
    this.props.updateItems(shelfName, itemAdded, this.state.weight, this.state.amount)
    this.clearInputs(); 
  }
  }

  expandShelf = () => {
    if(this.state.expanded === "collapsed") {
      this.setState({expanded: "expanded"})
  } else {
     this.setState({expanded: "collapsed"})
  }
  }

  render() {
    const { shelfName, shelfItems, deleteItem } = this.props;
    return (
      <article className="shelf-card">
        <div className="shelf-category-container">
          <h2 className="shelf-category">{shelfName}</h2>
            <button 
            className="shelf-expand-btn" 
            aria-expanded="false"
            onClick={this.expandShelf}
            >
              <MdExpandMore className={`shelf-expand-icon ${this.state.expanded}`}/>
            </button>
        </div>
        <div className="shelf-expand-container">
          {this.state.error && <p>{this.state.error}</p>}
          <form className={`form-add-item ${this.state.expanded}`} onSubmit={(event) => this.handleSubmit(event, shelfName)}>
            <label className="form-item-label">gear name
            <input
            className="form-item-input"
            type="text"
            name="itemName"
            value={this.state.itemName}
            onChange={this.handleChange}
            />
            </label>
            <label className="form-quantity-label"> weight
            <input
            className="form-quantity-input"
            type="number"
            min="0"
            name="weight"
            value={this.state.weight}
            onChange={this.handleChange}
            /> oz
            </label>
            <label className="form-quantity-label"> amount
            <input
            className="form-quantity-input"
            type="number"
            min="0"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
            /> 
            </label>
            <button
            type="submit"
            className="form-add-item-btn"
            >
              <MdAdd className="form-add-item-icon"/>
            </button>
          </form>
          <ShelfItems 
          shelfName={shelfName}
          shelfItems={shelfItems}
          deleteItem={deleteItem}
          />
        </div>
      </article>
    )
  }
}

export default ShelfCard;