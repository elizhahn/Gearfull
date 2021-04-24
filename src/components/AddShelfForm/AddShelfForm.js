import  { React, Component } from "react";
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
    this.setState = ({newShelf: "", error: ""})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(checkShelves(this.props.shelves, this.state.newShelf)) {
      this.setState({error: "This shelf already exists"})
  } else if (!this.state.newShelf) {
      this.setState({error: "Please create a shelf name"})
  } else {
    this.props.addShelf(this.state.newShelf.toLowerCase())
    this.clearInputs(); 
  } 
  }

  render() {
    return (
      <form className="form-add-shelf-container" onSubmit={this.handleSubmit}>
        <button 
        className="form-add-shelf-btn"
        type="submit" 
        >
          add a shelf
      </button>
      <input
        className="form-add-shelf-input"
        type="text"
        value={this.state.value}
        name="newShelf"
        onChange={this.handleChange}
      />
      {this.state.error && <p className="form-add-shelf-error">{this.state.error}</p>}
    </form>
    )
  }
}

export default AddShelfForm;