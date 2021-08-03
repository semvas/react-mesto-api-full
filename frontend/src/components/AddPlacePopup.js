import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      btnTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          name="name"
          id="place-input"
          className="popup__input"
          placeholder="Название"
          minLength="2" maxLength="30"
          onChange={handleNameChange}
          value={name || ''}
          required
        />
        <span className="popup__input-error place-input-error" />
      </label>
      <label className="popup__field">
        <input
          type="url"
          name="link"
          id="url-input"
          className="popup__input"
          placeholder="Ссылка на картинку"
          onChange={handleLinkChange}
          value={link || ''}
          required
        />
        <span className="popup__input-error url-input-error" />
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;