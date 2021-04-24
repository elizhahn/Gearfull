import React from "react";
import ReactDOM from "react-dom"; 

const RemoveModal = () => {
  return ReactDOM.createPortal((
    <section className="remove-modal-overlay">
      <div className="remove-modal-content">
        <p>Are you sure you want to remove this shelf?</p>
        <p>This will delete the shelf and all it's contents</p>
        <div className="remove-modal-options">
          <button className="remove-modal-btn">Yes remove please</button>
          <button className="remove-modal-btn">No take me back</button>
        </div>
      </div>
    </section>
  ), document.querySelector("#removeShelfModal"))
}

export default RemoveModal; 