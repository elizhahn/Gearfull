import { Component } from "react";
import Home from "../Home/Home";
import Shelves from "../Shelves/Shelves";
import { Route } from "react-router-dom";
import { GiMountains } from "react-icons/gi";

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
        <header className="header">
          <h1 className="header-title" data-cy="dashboard-title">Gearfull</h1>
          <p className="header-greeting" data-cy="greeting"><span className="header-greeting-green">Welcome </span>{this.state.user}</p>
          <button className="header-mountain-btn"><GiMountains className="header-mountain-icon" /></button>
        </header>
        <Shelves/>
      </Route>
    </div>
  );
}
}

export default App;
