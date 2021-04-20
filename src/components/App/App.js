import { Component } from "react";
import Home from "../Home/Home";
import { Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super() 
    this.state = {
      user: ""
    }
  }
  displayName = (name) => {
    this.setState({user: name})
  }

  render() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home displayName={this.displayName}/>
      </Route>
      <Route path="/dashboard">
        <p>Dashboard</p>
        <p>{this.state.user}</p>
      </Route>
    </div>
  );
}
}

export default App;
