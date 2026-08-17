import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { api } from "../utils/Api";
import { register, authorize, checkToken } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  // Checklist: "Se agregan nuevas variables de estado a los
  // componentes: email, al componente App."
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  // Estado para la ventanita InfoTooltip (éxito/error de registro)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  // Checklist: "Al montar App, comprueba si existe un JWT."
  // Paso 5: "Implementa localStorage para almacenar y acceder al
  // token... En visitas repetidas, los usuarios no tendrían por qué
  // iniciar sesión."
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    checkToken(jwt)
      .then((data) => {
        api.setToken(jwt);
        setEmail(data.data ? data.data.email : data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("jwt");
      });
    // Este efecto debe correr solo una vez, al montar la app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checklist: "La solicitud API de información sobre el usuario y el
  // array de tarjetas se hace solo una vez." Se dispara cuando
  // loggedIn pasa a true (login exitoso o token válido encontrado).
  useEffect(() => {
    if (!loggedIn) return;

    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error(error));

    api
      .getInitialCards()
      .then((data) => {
        const cardsArray = Array.isArray(data)
          ? data
          : data.data || data.cards || [];
        setCards(cardsArray);
      })
      .catch((error) => console.error(error));
  }, [loggedIn]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  // Checklist: "Todas las solicitudes API se describen dentro del
  // componente App." (esto ya lo tenías bien, se mantiene igual)
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;
    const likeMethod = isLiked
      ? api.unlikeCard(card._id)
      : api.likeCard(card._id);

    likeMethod
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  // Checklist: "Cuando se llama al controlador onLogin(), el JWT se
  // guarda." / "Tras una autorización correcta, el usuario será
  // redirigido a /."
  function handleLogin(userEmail, password) {
    setLoginError("");
    authorize(userEmail, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        api.setToken(data.token);
        setEmail(userEmail);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setLoginError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
      });
  }

  // Checklist: "InfoTooltip: informa al usuario si ha sido registrado
  // exitosamente."
  function handleRegister(userEmail, password) {
    register(userEmail, password)
      .then(() => {
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((error) => {
        console.error(error);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // Checklist: "Cuando se llama al controlador onSignOut() el JWT se
  // elimina." / "Tras una llamada exitosa al controlador onSignOut()
  // se redireccionará al usuario a /signin."
  function handleSignOut() {
    localStorage.removeItem("jwt");
    api.setToken(null);
    setLoggedIn(false);
    setEmail("");
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          userEmail={email}
          onSignOut={handleSignOut}
        />

        <Routes>
          {/* Instrucción: "/signup: para el registro de usuarios." */}
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          {/* Instrucción: "/signin: para la autorización de usuarios." */}
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} error={loginError} />}
          />

          {/* Instrucción: "Toda la funcionalidad de tu aplicación
              estará disponible únicamente para usuarios autorizados a
              través de la ruta raíz /." Aquí va tu app original,
              protegida por ProtectedRoute. */}
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Main
                    cards={cards}
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />

          {/* Instrucción: "...independientemente de la ruta desde la
              que accedió." */}
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegisterSuccess}
          onClose={() => setIsInfoTooltipOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
