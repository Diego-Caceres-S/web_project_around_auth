import { useState } from "react";
import { Link } from "react-router-dom";

// Checklist: "Login: el componente para la autorización de usuarios
// con las variables de estado necesarias."
// "Se agregan nuevas variables de estado a los componentes: email y
// password, a los componentes Login y Register."
export default function Login({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Checklist: "Todas las solicitudes API se describen dentro del
    // componente App." Por eso Login solo avisa (onLogin), no llama
    // a auth.js directamente.
    onLogin(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Iniciar sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="auth__error">{error}</p>}

        <button className="auth__button" type="submit">
          Iniciar sesión
        </button>
      </form>

      <p className="auth__hint">
        ¿Aún no eres miembro?{" "}
        <Link className="auth__link" to="/signup">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
