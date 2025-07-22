import { useEffect } from "react";
import "./PopupMessage.css";

function PopupMessage({ type = "info", message, onClose, duration = 2000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`popup-message ${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default PopupMessage;
