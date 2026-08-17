class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = null;
  }

  // Paso 3: "tendrás que agregar a tus solicitudes un encabezado
  // Authorization: Bearer {token}, utilizando el token recibido por
  // la solicitud de autenticación del usuario."
  // App.jsx llama a esto justo después de un login exitoso (o al
  // comprobar el token guardado al montar la app).
  setToken(token) {
    this._token = token;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this._token}`,
    };
  }

  _checkResponde(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Estado del servidor: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponde);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponde);
  }

  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponde);
  }

  setUserInfo(data) {
    return this.updateUserInfo(data);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponde);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponde);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponde);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponde);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar: avatarUrl }),
    }).then(this._checkResponde);
  }

  setUserAvatar({ avatar }) {
    return this.updateAvatar(avatar);
  }
}

// Ya no ponemos un token fijo aquí: se asigna dinámicamente con
// api.setToken(...) desde App.jsx, según quién haya iniciado sesión.
export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
});
