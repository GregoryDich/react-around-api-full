import React from "react";

function ImagePopup({ selectedCard, onClose }) {
  return (
    <div className={`popup popup_type_image ${selectedCard && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button popup__close-button_type_image"
        ></button>
        <img
          className="popup__image"
          src={selectedCard ? selectedCard.link : "#"}
          alt={selectedCard ? selectedCard.name : ""}
        />
        <span className="popup__image-title">
          {selectedCard ? selectedCard.name : ""}
        </span>
      </div>
    </div>
  );
}
export default ImagePopup;
