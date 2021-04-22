import { React, Component } from "react";

class PackStatistics extends Component {
  constructor() {
    super()
    this.state = {
      totalWeight: 0,
    }
  }
  render () {
    return (
      <aside className="statistics-container">
        <p>This will be the weight box</p>
      </aside>
    )
  }
}

export default PackStatistics