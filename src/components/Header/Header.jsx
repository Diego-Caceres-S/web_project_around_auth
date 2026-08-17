import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

// Instrucción: "El encabezado debe ser diferente para los usuarios
// autorizados y los no autorizados, según el diseño de Figma."
function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      {loggedIn ? (
        // Usuario autorizado: muestra su correo y un botón para
        // cerrar sesión (checklist: onSignOut() se llama desde Header
        // o se pasa como prop desde App).
        <div className="header__user-info">
          <p className="header__email">{userEmail}</p>
          <button className="header__link" type="button" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      ) : location.pathname === "/signin" ? (
        // Instrucción: "/signup: para el registro de usuarios."
        <Link className="header__link" to="/signup">
          Regístrate
        </Link>
      ) : (
        // Instrucción: "/signin: para la autorización de usuarios."
        <Link className="header__link" to="/signin">
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}

export default Header;
