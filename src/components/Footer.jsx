import "./Footer.css"

// Textos que se repiten en la banda animada del footer
const textosBanda = ["Brew Bold", "Chill Smooth", "Crafted Cold", "Sip Slow", "Wake Up Fresh", "Pour with Love"]

function Footer() {
  return (
    <footer className="footer-wrapper">

      {/* Banda naranja con textos que se mueven en bucle */}
      <div className="footer-marquee">
        <div className="marquee-track">
          {/* Duplicamos el array para que la animación no tenga cortes */}
          {[...textosBanda, ...textosBanda].map((texto, i) => (
            <span key={i} className="marquee-item">
              {texto.toUpperCase()} <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="footer-main">

        {/* Fila superior: logo a la izquierda, frase a la derecha */}
        <div className="footer-top">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <ellipse cx="14" cy="14" rx="13" ry="13" fill="#e8844a" />
              <path d="M14 5 C10 5 7 8.5 7 14 C7 19.5 10 23 14 23 C18 23 21 19.5 21 14 C21 8.5 18 5 14 5Z" fill="#fff" />
              <path d="M14 7 C14 7 14 21 14 21" stroke="#e8844a" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="footer-logo-text">CAFEÍNA</span>
          </div>
          <p className="footer-tagline">Make every coffee moment<br />feel intentional</p>
        </div>

        {/* Línea separadora */}
        <div className="footer-divider" />

        {/* Tres columnas de información */}
        <div className="footer-bottom">

          {/* Columna 1: enlaces de navegación */}
          <ul className="footer-nav">
            <li><a href="/menu">Menu</a></li>
            <li><a href="/create-cafe">Crear café</a></li>
            <li><a href="/edit-cafes">Editar cafés</a></li>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Blog</a></li>
          </ul>

          {/* Columna 2: información de contacto */}
          <div className="footer-contact">
            <p className="footer-col-title">Contacto</p>
            <p>hola@cafeinacreativa.com</p>
            <p>+34 612 345 678</p>
            <br />
            <p className="footer-col-title">Cafeína Creativa</p>
            <p>Calle Gran Vía 14<br />Madrid, 28013<br />España</p>
          </div>

          {/* Columna 3: redes sociales */}
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Pinterest</a>
          </div>

        </div>

        {/* Copyright al pie */}
        <div className="footer-copyright">
          © {new Date().getFullYear()} Cafeína Creativa. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}

export default Footer
