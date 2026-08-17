import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Paso 1 "Crear rutas y redireccionar": BrowserRouter le permite a la
// app leer y reaccionar a la dirección del navegador.
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
