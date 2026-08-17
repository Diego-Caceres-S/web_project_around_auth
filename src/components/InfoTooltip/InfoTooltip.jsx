export default function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup popup_is-opened">
      <div className="popup__content popup__content_type_tooltip">
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>

        {isSuccess ? (
          <svg
            className="popup__tooltip-icon"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="45" cy="45" r="42" stroke="#000000" strokeWidth="3" />
            <path
              d="M27 46L39 58L64 33"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="popup__tooltip-icon"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="45" cy="45" r="42" stroke="#FF5454" strokeWidth="3" />
            <line
              x1="30"
              y1="30"
              x2="60"
              y2="60"
              stroke="#FF5454"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="30"
              x2="30"
              y2="60"
              stroke="#FF5454"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}

        <p className="popup__tooltip-text">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
