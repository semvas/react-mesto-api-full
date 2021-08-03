function PopupWithForm(props) {
  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-btn">{props.btnTitle}</button>
        </form>
        <button type="button" className="btn popup__close-btn" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;