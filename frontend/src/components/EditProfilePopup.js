import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      btnTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          name="name"
          id="name-input"
          className="popup__input"
          placeholder="Имя"
          minLength="2" maxLength="40"
          onChange={handleNameChange}
          value={name || ''}
          required
        />
        <span className="popup__input-error name-input-error" />
      </label>
      <label className="popup__field">
        <input
          type="text"
          name="about"
          id="desc-input"
          className="popup__input"
          placeholder="О себе"
          minLength="2" maxLength="200"
          onChange={handleDescriptionChange}
          value={description || ''}
          required
        />
        <span className="popup__input-error desc-input-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;