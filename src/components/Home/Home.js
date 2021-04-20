import { React, Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      name: ""
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  updateName = (name) => {

  }

  render() {
    console.log(this.state)
    return (
      <section>
        <h1>Cool title here</h1>
        <Link to="/dashboard">
          <button onClick={() => updateName(this.state.name)}>Get started</button>
        </Link>
        <input 
        type="text" 
        name="name" 
        value={this.state.value} 
        onChange={this.handleChange}
        aria-label="enter name"/>
      </section>
    )
  }
}

export default Home 