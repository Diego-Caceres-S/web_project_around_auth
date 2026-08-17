# Around The U.S.

## Descripción del proyecto

Around The U.S. es una red social de fotografías de viajes. Los usuarios
pueden registrarse, iniciar sesión, editar su perfil y avatar, agregar
tarjetas con fotos de lugares, darles "me gusta" y eliminarlas.

## Funcionalidad

- Registro e inicio de sesión de usuarios (JWT).
- La sesión se mantiene guardada en el navegador (localStorage), así
  que no hace falta iniciar sesión de nuevo en visitas repetidas.
- La ruta principal `/` solo es accesible para usuarios autorizados.
- Edición de perfil y avatar.
- Agregar y eliminar tarjetas.
- Dar y quitar "me gusta" a las tarjetas.

## Tecnologías y técnicas utilizadas

- React (componentes funcionales + Hooks: useState, useEffect)
- React Router (manejo de rutas /signin, /signup, /)
- Context API (CurrentUserContext)
- Vite como entorno de desarrollo
- CSS con metodología BEM
- Fetch API para las solicitudes al backend
- JSON Web Tokens (JWT) + localStorage para la autenticación
