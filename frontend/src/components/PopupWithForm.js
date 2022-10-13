import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, onSubmit, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          onClick={onClose}
          className={`popup__close-button popup__close-button_type_${name}`}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          action="submit"
          name={name}
        >
          {children}
          <button className="popup__button popup__form-button" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
