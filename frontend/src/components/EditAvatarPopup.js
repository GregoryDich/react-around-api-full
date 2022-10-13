import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      ref.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Change profile picture"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__form-input_type_avatar"
        type="url"
        placeholder="Link to image"
        name="avatar"
        required
        ref={ref}
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
