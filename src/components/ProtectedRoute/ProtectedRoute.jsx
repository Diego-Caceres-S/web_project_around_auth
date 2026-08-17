import { Navigate } from "react-router-dom";

// Checklist "Registro y autorización":
// "La ruta / está protegida por el componente HOC ProtectedRoute."
// "Al intentar acceder a la ruta /, se redireccionará a los usuarios
// no autorizados a /signin."
//
// Nota: la lista de control original menciona useHistory/Switch/
// Redirect (React Router v5). Como instalamos la versión moderna,
// usamos el equivalente actual: un componente que recibe "children"
// y decide si los muestra, o redirige con <Navigate>.
export default function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
