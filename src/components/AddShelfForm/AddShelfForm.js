import  { React, Component } from "react";
import PropTypes from "prop-types";
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

  clearInputs = () => {
    this.setState({newShelf: "", error: ""})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(checkShelves(this.props.shelves, this.state.newShelf)) {
      this.setState({error: "This shelf already exists"})
  } else if (!this.state.newShelf) {
      this.setState({error: "Please create a shelf name"})
  } else {
    this.props.addShelf(this.state.newShelf)
    this.clearInputs(); 
  } 
  }

  render() {
    return (
      <form className="form-add-shelf-container" onSubmit={this.handleSubmit} data-cy="add-shelf-form">
        <button 
        className="form-add-shelf-btn"
        type="submit"
        data-cy="add-shelf-btn"
        >
          add a shelf
      </button>
      <input
        className="form-add-shelf-input"
        type="text"
        value={this.state.newShelf}
        name="newShelf"
        onChange={this.handleChange}
        data-cy="add-shelf-input"
      />
      {this.state.error && <p className="form-add-shelf-error" data-cy="add-shelf-msg">{this.state.error}</p>}
    </form>
    )
  }
}

export default AddShelfForm;

AddShelfForm.propTypes = {
  addShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired
}