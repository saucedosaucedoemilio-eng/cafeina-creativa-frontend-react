import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [usuario, setUsuario] = useState(() =>
    JSON.parse(localStorage.getItem("usuario"))
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-banner">
        <div className="banner-track">
          {[...Array(2)].map((_, gi) => (
            <span key={gi} className="banner-group">
              <span className="banner-item">☕ El sabor perfecto en cada sorbo <span className="banner-dot">•</span></span>
              <span className="banner-item"><Link to="/menu" className="banner-link">Explorar menú</Link> <span className="banner-dot">•</span></span>
              <span className="banner-item">Artesanal &amp; con amor <span className="banner-dot">•</span></span>
              <span className="banner-item">Cafeína Creativa <span className="banner-dot">•</span></span>
            </span>
          ))}
        </div>
      </div>

      <nav className="navbar">
        <ul className="navbar-links">
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/create-cafe">Crear café</Link></li>
          <li><Link to="/edit-cafes">Editar cafés</Link></li>
        </ul>

        <Link to="/" className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="14" cy="14" rx="13" ry="13" fill="#c8522a" />
            <path d="M14 5 C10 5 7 8.5 7 14 C7 19.5 10 23 14 23 C18 23 21 19.5 21 14 C21 8.5 18 5 14 5Z" fill="#3b1f0e" />
            <path d="M14 7 C14 7 14 21 14 21" stroke="#c8522a" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="navbar-logo-text">CAFEÍNA</span>
        </Link>

        <div className="navbar-right">
          {usuario ? (
            <div className="navbar-user">
              <span className="navbar-username">Hola, {usuario.nombre}</span>
              <button className="navbar-logout" onClick={handleLogout}>Salir</button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-login">Iniciar sesión</Link>
              <Link to="/register" className="navbar-cta">Registrarse</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
