import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { api } from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

function App() {
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const[isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const[cards, setCards] = useState([]);
  const[selectedCard, setSelectedCard] = useState({name: '', link: ''});

  const[currentUser, setCurrentUser] = useState({});
  const[email, setEmail] = useState('');
  const[loggedIn, setLoggedIn] = useState(false);
  const[isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() =>{
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
    .then(([userData, initialCards]) => {
      setCurrentUser(userData);
      setCards(initialCards);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        auth.checkToken(jwt).then(res => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }

  function handleRegister(email, password) {
    auth.register(email, password).then(res => {
      if (res) {
        setIsSuccess(true);
        setIsInfoPopupOpen(true);
        history.push("/sign-in");
      }
    })
    .catch(err => {
      console.log(err);
      setIsSuccess(false);
      setIsInfoPopupOpen(true);
    });
  }

  function handleAuthorize(email, password) {
    auth.authorize(email, password).then( res => {
      if (res) {
        localStorage.setItem('jwt', res.token);
        handleTokenCheck();
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLike(card._id, isLiked)
    .then(newCard => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(state => state.filter(c => c._id !== card._id));
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            loggedIn={loggedIn}
            email={email}
            onSignOut={handleSignOut}
          />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleAuthorize} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              exact path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>
          <Footer />
        </div>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          status={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;