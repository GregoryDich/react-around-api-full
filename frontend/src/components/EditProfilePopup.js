import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="profile"
      title="Edit profile"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        className="popup__form-input popup__form-input_type_name"
        type="text"
        placeholder="Name"
        name="name"
        minLength="2"
        maxLength="40"
        required
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__error name-input-error"></span>
      <input
        value={description}
        className="popup__form-input popup__form-input_type_profession"
        type="text"
        placeholder="About me"
        name="profession"
        minLength="2"
        maxLength="200"
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="popup__error profession-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
