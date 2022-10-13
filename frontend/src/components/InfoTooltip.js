import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, isSucceed, onClose }) {
  return (
    <section className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__info-container">
        <button
          className="popup__close-button popup__close-button_type_tooltip"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__register-picture"
          src={isSucceed ? success : fail}
          alt="register status"
        ></img>
        <h2 className="popup__title popup__title_type_tooltip">
          {isSucceed
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
