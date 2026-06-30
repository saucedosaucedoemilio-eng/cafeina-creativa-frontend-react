// useState guarda datos que cambian
// useEffect ejecuta código cuando el componente se monta (carga)
import { useState, useEffect } from "react"
import axios from "axios"
import "./Menu.css"

function Menu() {

  // Lista de cafés que llegan de la API
  const [cafes, setCafes] = useState([])

  // true mientras esperamos la respuesta de la API
  const [loading, setLoading] = useState(true)

  // Guarda el mensaje de error si algo falla
  const [error, setError] = useState(null)

  // Categoría seleccionada para filtrar ("All" muestra todos)
  const [categoriaActiva, setCategoriaActiva] = useState("All")

  // useEffect se ejecuta una sola vez cuando la página carga
  useEffect(function() {
    // Pedimos todos los cafés a la API
    axios.get("https://cafe-api-backend.onrender.com/cafes")
      .then(function(response) {
        // Guardamos los cafés en el estado
        setCafes(response.data)
        // Indicamos que ya terminó de cargar
        setLoading(false)
      })
      .catch(function() {
        // Si hay error, guardamos el mensaje
        setError("Error al cargar los cafés")
        setLoading(false)
      })
  }, []) // El array vacío [] significa que solo se ejecuta una vez

  // Mientras carga mostramos este mensaje
  if (loading) return <p>Cargando cafés...</p>

  // Si hubo error mostramos el mensaje de error
  if (error) return <p>{error}</p>

  // Por defecto mostramos todos los cafés
  let cafesParaMostrar = cafes

  // Si hay una categoría seleccionada, filtramos los cafés
  if (categoriaActiva !== "All") {
    cafesParaMostrar = cafes.filter(function(cafe) {
      return cafe.category === categoriaActiva
    })
  }

  return (
    <div className="menu-page">

      {/* Botones para filtrar por categoría */}
      <div className="menu-filters">
        {/* Cada botón cambia la categoría activa al hacer click */}
        <button
          className={"filter-btn " + (categoriaActiva === "All" ? "active" : "")}
          onClick={function() { setCategoriaActiva("All") }}
        >
          All
        </button>
        <button
          className={"filter-btn " + (categoriaActiva === "Cold Brew" ? "active" : "")}
          onClick={function() { setCategoriaActiva("Cold Brew") }}
        >
          Cold Brew
        </button>
        <button
          className={"filter-btn " + (categoriaActiva === "Frappuccino" ? "active" : "")}
          onClick={function() { setCategoriaActiva("Frappuccino") }}
        >
          Frappuccino
        </button>
        <button
          className={"filter-btn " + (categoriaActiva === "Espresso" ? "active" : "")}
          onClick={function() { setCategoriaActiva("Espresso") }}
        >
          Espresso
        </button>
        <button
          className={"filter-btn " + (categoriaActiva === "Té Frío" ? "active" : "")}
          onClick={function() { setCategoriaActiva("Té Frío") }}
        >
          Té Frío
        </button>
      </div>

      {/* Grid de tarjetas de cafés */}
      <div className="cafes-grid">
        {/* Recorremos el array de cafés y pintamos una tarjeta por cada uno */}
        {cafesParaMostrar.map(function(cafe) {
          return (
            <div key={cafe.id} className="cafe-card">

              {/* Rating con estrella en la esquina superior derecha */}
              <div className="cafe-card-rating">
                {cafe.rating} <span className="star">★</span>
              </div>

              {/* Imagen del café */}
              <img
                src={cafe["cafe-image"]}
                alt={cafe.title}
                onError={function(e) {
                  // Si la imagen falla, mostramos un placeholder
                  e.target.onerror = null
                  e.target.src = "https://placehold.co/300x260/f5efe6/c8522a?text=☕"
                }}
              />

              {/* Nombre del café */}
              <p className="cafe-card-title">{cafe.title}</p>

              {/* Pie de la tarjeta: precio y botón */}
              <div className="cafe-card-footer">
                {/* toFixed(2) muestra siempre 2 decimales */}
                <span className="cafe-card-price">${cafe.price.toFixed(2)}</span>
                <span className="cafe-card-cta">Get this brew →</span>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Menu
