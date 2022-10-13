import React from "react";
import avatarPencil from "../images/pencil.svg";
import addButton from "../images/addButton.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="user">
        <div className="user__avatar">
          <div onClick={onEditAvatarClick} className="user__avatar-overlay">
            <img
              className="user__avatar-overlay-icon"
              src={avatarPencil}
              alt="avatar"
            />
          </div>
          <img
            className="user__avatar-image"
            src={currentUser.avatar}
            alt="jacques"
          />
        </div>
        <div className="user__information">
          <div className="user__name-wrapper">
            <h1 className="user__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfileClick}
              type="button"
              className="user__edit-button"
            ></button>
          </div>
          <p className="user__profession">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlaceClick}
          className="user__add-button"
          type="button"
        >
          <img
            className="user__add-button-icon"
            src={addButton}
            alt="add button icon"
          />
        </button>
      </section>
      <section className="gallery">
        {cards.length && cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
      </section>
    </main>
  );
}
export default Main;
