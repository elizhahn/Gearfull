import { React, Component } from "react";
import { MdExpandMore } from "react-icons/md";
import { MdAdd } from "react-icons/md";

class ShelfCard extends Component {
  constructor(props) {
    super(props) 
    this.state = { 
      itemName: '',
      weight: '',
      amount: '',
      error: '',
      expanded: "collapsed", 
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event, shelfName) => {
    event.preventDefault()
    if(!this.state.itemName || !this.state.weight || !this.state.amount) {
      this.setState({error: "Please fill out all the fields"})
  } else {
    this.props.updateItems(shelfName)
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
    const { shelfName } = this.props;
    return (
      <article className="shelf-card">
        <div className="shelf-category-container">
          <h2 className="shelf-category">{shelfName}</h2>
          <div className="shelf-expand-btn-container">
            <button 
            className="shelf-expand-btn" 
            aria-expanded="false"
            onClick={this.expandShelf}
            >
              <MdExpandMore className="shelf-expand-icon"/>
            </button>
          </div>
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
            name="weight"
            value={this.state.weight}
            onChange={this.handleChange}
            /> oz
            </label>
            <label className="form-quantity-label"> amount
            <input
            className="form-quantity-input"
            type="number"
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
        </div>
      </article>
    )
  }
}

export default ShelfCard;