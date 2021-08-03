import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-wrapper" onClick={props.onEditAvatar}>
          <img className="profile__image" src={currentUser.avatar} alt="Аватарка" />
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="btn profile__edit-btn" onClick={props.onEditProfile} />
          </div>
          <p className="profile__desc">{currentUser.about}</p>
        </div>
        <button type="button" className="btn profile__add-btn" onClick={props.onAddPlace} />
      </section>
      <section className="photo-cards">
        <ul className="elements">
          {props.cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main