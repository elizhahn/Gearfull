import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom"; 

const RemoveModal = ({ shelfName, handleModal, handleRemoveShelf }) => {
  return ReactDOM.createPortal((
    <section className="remove-modal-overlay">
      <div className="remove-modal-content" data-cy="modal">
        <p data-cy="modal-warning-msg-1">Are you sure you want to remove this shelf?</p>
        <p data-cy="modal-warning-msg-2">This will delete the shelf and all it's contents</p>
        <div className="remove-modal-options">
          <button 
            className="remove-modal-btn" 
            onClick={() => handleRemoveShelf(shelfName)} data-cy="modal-remove-btn"
            >
              Yes remove please
          </button>
          <button 
            className="remove-modal-btn" 
            onClick={handleModal}
            data-cy="modal-return-btn"
          >
            No take me back
          </button>
        </div>
      </div>
    </section>
  ), document.querySelector("#removeShelfModal"))
}

export default RemoveModal; 

RemoveModal.propTypes = {
  shelfName: PropTypes.string.isRequired, 
  handleModal: PropTypes.func.isRequired, 
  handleRemoveShelf: PropTypes.func.isRequired
}