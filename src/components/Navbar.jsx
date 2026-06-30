// useState guarda datos que pueden cambiar (estado)
import { useState } from "react"

// Link es como un <a> pero sin recargar la página
// useNavigate nos permite ir a otra página desde código
import { Link, useNavigate } from "react-router-dom"

import "./Navbar.css"

function Navbar() {

  // Comprobamos si hay un token guardado (significa que el usuario está logueado)
  const [token, setToken] = useState(localStorage.getItem("token"))

  // useNavigate nos permite redirigir al usuario desde código
  const navigate = useNavigate()

  // Función que se ejecuta cuando el usuario pulsa "Salir"
  function handleLogout() {
    // Borramos el token del localStorage
    localStorage.removeItem("token")
    // Actualizamos el estado para que el navbar cambie visualmente
    setToken(null)
    // Mandamos al usuario a la página de login
    navigate("/login")
  }

  return (
    <header className="navbar-wrapper">

      {/* Banda de texto animado que se mueve de derecha a izquierda */}
      <div className="navbar-banner">
        <div className="banner-track">
          {/* Duplicamos los textos para que la animación sea infinita sin cortes */}
          {[...Array(2)].map((_, i) => (
            <span key={i} className="banner-group">
              <span className="banner-item">☕ El sabor perfecto en cada sorbo <span className="banner-dot">•</span></span>
              <span className="banner-item"><Link to="/menu" className="banner-link">Explorar menú</Link> <span className="banner-dot">•</span></span>
              <span className="banner-item">Artesanal &amp; con amor <span className="banner-dot">•</span></span>
              <span className="banner-item">Cafeína Creativa <span className="banner-dot">•</span></span>
            </span>
          ))}
        </div>
      </div>

      {/* Barra de navegación principal */}
      <nav className="navbar">

        {/* Links de la izquierda */}
        <ul className="navbar-links">
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/create-cafe">Crear café</Link></li>
          {/* Solo mostramos "Editar cafés" si el usuario ha iniciado sesión */}
          {token && <li><Link to="/edit-cafes">Editar cafés</Link></li>}
        </ul>

        {/* Logo del centro */}
        <Link to="/" className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <ellipse cx="14" cy="14" rx="13" ry="13" fill="#c8522a" />
            <path d="M14 5 C10 5 7 8.5 7 14 C7 19.5 10 23 14 23 C18 23 21 19.5 21 14 C21 8.5 18 5 14 5Z" fill="#3b1f0e" />
            <path d="M14 7 C14 7 14 21 14 21" stroke="#c8522a" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="navbar-logo-text">CAFEÍNA</span>
        </Link>

        {/* Zona derecha: cambia según si hay sesión o no */}
        <div className="navbar-right">

          {/* Si hay token (sesión activa) mostramos el botón de salir */}
          {token ? (
            <div className="navbar-user">
              <span className="navbar-username">Sesión activa</span>
              <button className="navbar-logout" onClick={handleLogout}>Salir</button>
            </div>
          ) : (
            /* Si NO hay token mostramos el botón de iniciar sesión */
            <div className="navbar-auth">
              <Link to="/login" className="navbar-cta">Iniciar sesión</Link>
            </div>
          )}

        </div>
      </nav>

    </header>
  )
}

export default Navbar
