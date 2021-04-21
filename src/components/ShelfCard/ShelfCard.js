import { React, Component } from "react";
import { MdExpandMore } from "react-icons/md";

class ShelfCard extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      items: {},
      itemName: '',
      weight: 0,
      amount: 0, 
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { shelfName } = this.props;
    return (
      <article className="shelf-card">
        <div className="shelf-category-container">
          <h2 className="shelf-category">{shelfName}</h2>
          <button className="shelf-expand-btn" aria-expanded="false"><MdExpandMore className="shelf-expand-icon"/></button>
        </div>
        <form>
          <label>gear name
          <input
          type="text"
          name="itemName"
          value={this.state.itemName}
          onChange={this.handleChange}
          />
          </label>
          <label> weight
          <input
          type="number"
          name="weight"
          value={this.state.weight}
          onChange={this.handleChange}
          /> oz
          </label>
          <label> amount
          <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handleChange}
          /> 
          </label>

        </form>
      </article>
    )
  }
}

export default ShelfCard;