import { React, Component } from "react";

class PackStatistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalWeight: 0,
    }
  }
  
  calculatePackWeight = (allShelfItems) => {
    const packItemsList = Object.values(allShelfItems)
    const weight = packItemsList.reduce((total, shelfItems) => {
      if(Object.keys(shelfItems).length) {
        const items = Object.values(shelfItems)
          items.forEach(item => {
            total += Number(item.weight);
        });
      }
      return total
    }, 0);
    
    return weight;
  }

  render () {
    const { packItems } = this.props
    this.calculatePackWeight(packItems)
    return (
      <aside className="statistics-container">
        <p>This will be the weight box</p>
      </aside>
    )
  }
}

export default PackStatistics