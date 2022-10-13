import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { signUp, signIn, verifyToken } from "../utils/auth";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isSucceed, setIsSucceed] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const history = useHistory();

  React.useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res.user);
          setCurrentUserEmail(res.user.email);
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  React.useEffect(() => {
    loggedIn &&
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards.data)
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    token &&
      verifyToken(token)
        .then((res) => {
          setCurrentUserEmail(res.user.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
  }, [history]);

  function handleRegister({ email, password }) {
    signUp({ email, password })
      .then((res) => {
        if (res.status === 200) {
          setIsSucceed(true);
          history.push("/signin");
        } else {
          setIsSucceed(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsInfoTooltipOpened(true);
      });
  }

  function handleLogin({ email, password }) {
    signIn({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setIsSucceed(false);
        setIsInfoTooltipOpened(true);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({});
    setCurrentUserEmail('');
    localStorage.removeItem("jwt");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .changeLikeCardStatus(isLiked, card)
      .then((res) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? res.data : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card)
      .then((res) => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        console.log(res.user);
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleImagePopupOpen(card) {
    setSelectedCard(card);
  }

  function openEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipOpened(false);
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          currentEmail={currentUserEmail}
        />
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} exact path="/">
            <Main
              onEditProfileClick={openEditProfilePopup}
              onAddPlaceClick={openAddPlacePopup}
              onEditAvatarClick={openEditAvatarPopup}
              onCardClick={handleImagePopupOpen}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          isSucceed={isSucceed}
          onClose={closeAllPopups}
        />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
