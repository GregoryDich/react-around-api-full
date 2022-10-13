import React from "react";
import deleteButton from "../images/deleteButton.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((user) => user === currentUser._id);
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="card">
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          className="card__delete-button"
          type="button"
        >
          <img src={deleteButton} alt="trash basket" />
        </button>
      )}
      <img
        onClick={handleClick}
        className="card__image"
        src={card.link}
        alt={card.name}
      />
      <div className="card__info">
        <h2 className="card__description">{card.name}</h2>
        <div className="card__like-button-wrapper">
          <button
            onClick={handleLikeClick}
            type="button"
            className={`card__like-button ${
              isLiked && "card__like-button_active"
            }`}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;
