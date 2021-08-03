import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatar = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  React.useEffect(() => {
    avatar.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="change-ava"
      title="Обновить аватар"
      btnTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          name="avatar"
          id="avatar-input"
          className="popup__input"
          placeholder="Ссылка на картинку"
          ref={avatar}
          required
        />
        <span className="popup__input-error avatar-input-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;