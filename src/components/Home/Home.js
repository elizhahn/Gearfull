import { React, Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ""
    }
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  }

  updateName = (name) => {
    const { displayName } = this.props;
    displayName(name)
  }

  render() {
    return (
      <section className="home-background">
        <div className="home-container">
          <h1>Cool title here</h1>
          <input 
          className="home-name-input"
          type="text" 
          name="name" 
          placeholder="Enter your name here"
          value={this.state.value} 
          onChange={this.handleChange}
          aria-label="enter name"/>
          <Link to="/dashboard">
            <button className="home-start-btn" onClick={() => this.updateName(this.state.name)}>Get started</button>
          </Link>
        </div>
      </section>
    )
  }
}

export default Home 