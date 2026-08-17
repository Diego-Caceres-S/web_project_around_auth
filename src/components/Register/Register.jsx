import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
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

        <button className="auth__button" type="submit">
          Regístrate
        </button>
      </form>

      <p className="auth__hint">
        ¿Ya eres miembro?{" "}
        <Link className="auth__link" to="/signin">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}
