import  { React, Component } from "react";
import { MdAdd } from "react-icons/md";
import { checkShelves } from "../../utility";

class AddShelfForm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      newShelf: "",
      error: ""
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({[name]: value.toLowerCase()})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(checkShelves(this.props.shelves, this.state.newShelf)) {
      this.setState({error: "This shelf already exists"})
  } else if (!this.state.newShelf) {
      this.setState({error: "Please create a shelf name"})
  } else {
    this.props.addShelf(this.state.newShelf)
  } 
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error && <p>{this.state.error}</p>}
        <button 
        type="submit"
        className="shelves-add-category-btn" 
        >
          <MdAdd className="shelves-add-category-icon"/>
      </button>
      <input
        type="text"
        value={this.state.value}
        name="newShelf"
        onChange={this.handleChange}
      />
    </form>
    )
  }
}

export default AddShelfForm;