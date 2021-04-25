import { React, Component } from "react";
import ShelfItems from "../ShelfItems/ShelfItems";
import { MdAdd, MdExpandMore } from "react-icons/md";
import { IoMdRemoveCircle } from "react-icons/io";
import RemoveModal from "../RemoveModal/RemoveModal";

class ShelfCard extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      itemName: "",
      weight: "",
      amount: "",
      error: "",
      expanded: "collapsed", // use boolean here
      modalOpen: false
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
    this.setState({error: ""});
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

  handleModal = () => {
    this.state.modalOpen ? this.setState({modalOpen: false}) : this.setState({modalOpen: true})
  }

  handleRemoveShelf = (shelfName) => {
   this.props.deleteShelf(shelfName)
   this.handleModal();
  }

  render() {
    const { shelfName, shelfItems, deleteItem } = this.props;
    return (
      <article className="shelf-card" data-cy="shelf">
        <div className="shelf-category-container">
          <button 
            className="shelf-remove-category-btn"
            onClick={this.handleModal}>
              <IoMdRemoveCircle className="shelf-remove-category-icon"/>
          </button>
          <h2 className="shelf-category">{shelfName}</h2>
          <button 
            className="shelf-expand-btn" 
            aria-expanded="false"
            onClick={this.expandShelf}
            data-cy="expand-shelf-btn"
          >
            <MdExpandMore className={`shelf-expand-icon ${this.state.expanded}`} data-cy="expand-icon"/>
          </button>
          {this.state.modalOpen && 
          <RemoveModal 
            shelfName={shelfName}
            handleModal={this.handleModal}
            handleRemoveShelf={this.handleRemoveShelf}
          />}
        </div>
        <div className="shelf-expand-container">
          {this.state.error && <p className="form-error-msg">{this.state.error}</p>}
          <form className={`form-add-item ${this.state.expanded}`} onSubmit={(event) => this.handleSubmit(event, shelfName)}>
            <label className="form-item-label">gear name
            <input
              className="form-item-input"
              type="text"
              name="itemName"
              value={this.state.itemName}
              onChange={this.handleChange}
              data-cy="item-name-input"
            />
            </label>
            <label className="form-quantity-label"> weight
            <input
              className="form-quantity-input"
              type="number"
              min="0"
              step="any"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
              data-cy="item-weight-input"
            /> oz
            </label>
            <label className="form-quantity-label"> amount
            <input
              className="form-quantity-input"
              type="number"
              min="0"
              step="any"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              data-cy="item-amount-input"
            /> 
            </label>
            <button
              type="submit"
              className="form-add-item-btn"
              data-cy="item-add-btn"
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