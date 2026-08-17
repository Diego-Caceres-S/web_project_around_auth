import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
