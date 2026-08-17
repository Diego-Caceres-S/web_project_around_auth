import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

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
        <div className="header__user-info">
          <p className="header__email">{userEmail}</p>
          <button className="header__link" type="button" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      ) : location.pathname === "/signin" ? (
        <Link className="header__link" to="/signup">
          Regístrate
        </Link>
      ) : (
        <Link className="header__link" to="/signin">
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}

export default Header;
