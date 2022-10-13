import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [place, setPlace] = React.useState("");
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setPlace("");
      setUrl("");
    }
  }, [isOpen]);
  
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      url,
      place,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="place"
      title="New Place"
      onSubmit={handleSubmit}
    >
      <input
        value={place}
        className="popup__form-input popup__form-input_type_title"
        type="text"
        placeholder="Title"
        name="place"
        minLength="2"
        maxLength="30"
        required
        onChange={(e) => setPlace(e.target.value)}
      />
      <span className="popup__error place-input-error"></span>
      <input
        value={url}
        className="popup__form-input popup__form-input_type_url"
        type="url"
        placeholder="Image URL"
        name="url"
        required
        onChange={(e) => setUrl(e.target.value)}
      />
      <span className="popup__error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
