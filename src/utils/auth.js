// Paso 3 "Conectar la funcionalidad principal...": "crea un módulo
// por separado auth.js que contenga todos los métodos necesarios" y
// "deben estar ubicadas en el archivo auth.js en la carpeta /utils"

// Paso 4 "Implementar la autenticación del usuario":
// "URL base: https://se-register-api.en.tripleten-services.com/v1"
const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Paso 4: "Endpoint: /signup | Método: POST | Cuerpo: password, email"
export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Paso 4: "Endpoint: /signin | Método: POST | Respuesta: { token }"
export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Paso 4: "Endpoint: /users/me | Método: GET |
// Authorization: `Bearer ${Your JWT}`"
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
