import { useState, useEffect } from "react";
import axios from "axios";
import "./Menu.css";

function Menu() {
  // Lista de cafés que llegan de la API
  const [cafes, setCafes] = useState([]);
  // Controla si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Guarda el mensaje de error si algo falla
  const [error, setError] = useState(null);
  // Categoría seleccionada en los filtros ("All" por defecto)
  const [activeCategory, setActiveCategory] = useState("All");

  // Al montar el componente, pide los cafés a la API
  useEffect(() => {
    axios
      .get("https://cafe-api-backend.onrender.com/cafes")
      .then((response) => {
        setCafes(response.data); // Guarda los cafés en el estado
        setLoading(false);       // Ya no está cargando
      })
      .catch(() => {
        setError("Error al cargar los cafés"); // Muestra error si falla
        setLoading(false);
      });
  }, []); // El array vacío hace que esto solo se ejecute una vez

  // Muestra un mensaje mientras se cargan los datos
  if (loading) return <p>Cargando cafés...</p>;
  // Muestra el error si ocurrió uno
  if (error) return <p>{error}</p>;

  // Por defecto muestra todos los cafés
  let filteredCafes = cafes;

  // Si hay una categoría activa (no "All"), filtra por esa categoría
  if (activeCategory !== "All") {
    filteredCafes = cafes.filter((cafe) => cafe.category === activeCategory);
  }

  return (
    <div className="menu-page">
      {/* Botones de filtro por categoría */}
      <div className="menu-filters">
        {/* Cada botón recibe la clase "active" si su categoría está seleccionada */}
        <button className={`filter-btn ${activeCategory === "All" ? "active" : ""}`} onClick={() => setActiveCategory("All")}>All</button>
        <button className={`filter-btn ${activeCategory === "Cold Brew" ? "active" : ""}`} onClick={() => setActiveCategory("Cold Brew")}>Cold Brew</button>
        <button className={`filter-btn ${activeCategory === "Frappuccino" ? "active" : ""}`} onClick={() => setActiveCategory("Frappuccino")}>Frappuccino</button>
        <button className={`filter-btn ${activeCategory === "Espresso" ? "active" : ""}`} onClick={() => setActiveCategory("Espresso")}>Espresso</button>
        <button className={`filter-btn ${activeCategory === "Té Frío" ? "active" : ""}`} onClick={() => setActiveCategory("Té Frío")}>Té Frío</button>
      </div>

      {/* Grid de tarjetas — recorre los cafés filtrados y renderiza uno por cada café */}
      <div className="cafes-grid">
        {filteredCafes.map((cafe) => (
          <div key={cafe.id} className="cafe-card">
            {/* Rating con estrella */}
            <div className="cafe-card-rating">
              {cafe.rating} <span className="star">★</span>
            </div>
            {/* Imagen del café (viene como URL desde la API) */}
            <img
              src={cafe["cafe-image"]}
              alt={cafe.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x260/f5efe6/c8522a?text=☕";
              }}
            />
            <p className="cafe-card-title">{cafe.title}</p>
            <div className="cafe-card-footer">
              <span className="cafe-card-price">${cafe.price.toFixed(2)}</span>
              <span className="cafe-card-cta">Get this brew →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
