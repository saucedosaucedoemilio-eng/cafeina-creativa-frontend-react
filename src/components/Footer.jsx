import "./Footer.css";

const marqueeItems = ["Brew Bold", "Chill Smooth", "Crafted Cold", "Sip Slow", "Wake Up Fresh", "Pour with Love"];

function Footer() {
  return (
    <footer className="footer-wrapper">

      {/* Scrolling marquee strip */}
      <div className="footer-marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item.toUpperCase()} <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">

        {/* Top row: logo + tagline */}
        <div className="footer-top">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="14" rx="13" ry="13" fill="#e8844a" />
              <path d="M14 5 C10 5 7 8.5 7 14 C7 19.5 10 23 14 23 C18 23 21 19.5 21 14 C21 8.5 18 5 14 5Z" fill="#fff" />
              <path d="M14 7 C14 7 14 21 14 21" stroke="#e8844a" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="footer-logo-text">CAFEÍNA</span>
          </div>
          <p className="footer-tagline">Make every coffee moment<br />feel intentional</p>
        </div>

        <div className="footer-divider" />

        {/* Bottom row: 3 columns */}
        <div className="footer-bottom">

          {/* Column 1: nav links */}
          <ul className="footer-nav">
            <li><a href="/menu">Menu</a></li>
            <li><a href="/create-cafe">Crear café</a></li>
            <li><a href="/edit-cafes">Editar cafés</a></li>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Blog</a></li>
          </ul>

          {/* Column 2: contact */}
          <div className="footer-contact">
            <p className="footer-col-title">Contacto</p>
            <p>hola@cafeinacreativa.com</p>
            <p>+34 612 345 678</p>
            <br />
            <p className="footer-col-title">Cafeína Creativa</p>
            <p>Calle Gran Vía 14<br />Madrid, 28013<br />España</p>
          </div>

          {/* Column 3: social */}
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Pinterest</a>
          </div>

        </div>

        <div className="footer-copyright">
          © {new Date().getFullYear()} Cafeína Creativa. Todos los derechos reservados.
        </div>
      </div>

    </footer>
  );
}

export default Footer;
