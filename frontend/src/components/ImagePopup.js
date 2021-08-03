function ImagePopup(props) {
  return (
    <div className={`popup popup-img ${props.card.link ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>  
        <button type="button" className="btn popup__close-btn" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default ImagePopup