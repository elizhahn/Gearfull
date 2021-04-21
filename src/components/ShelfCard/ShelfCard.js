import { React, Component } from "react";
import { MdExpandMore } from "react-icons/md";

class ShelfCard extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      items: {}
    }
  }
  render() {
    const { shelfName } = this.props;
    return (
      <article className="shelf-card">
        <div className="shelf-category-container">
          <h2 className="shelf-category">{shelfName}</h2>
          <button className="shelf-expand-btn"><MdExpandMore className="shelf-expand-icon"/></button>
        </div>
      </article>
    )
  }
}

export default ShelfCard;