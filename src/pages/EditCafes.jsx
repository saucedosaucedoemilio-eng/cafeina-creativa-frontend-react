import { useState, useEffect } from "react"
import axios from "axios"
import EditCafeCard from "../components/EditCafeCard"
import "./EditCafes.css"

function EditCafes() {

  // Lista de cafés que llegan de la API
  const [cafes, setCafes] = useState([])

  // true mientras esperamos la respuesta
  const [loading, setLoading] = useState(true)

  // Mensaje de error si algo falla
  const [error, setError] = useState(null)

  // Cargamos los cafés cuando la página se monta
  useEffect(function() {
    axios.get("https://cafe-api-backend.onrender.com/cafes")
      .then(function(response) {
        setCafes(response.data)
        setLoading(false)
      })
      .catch(function() {
        setError("Error al cargar los cafés.")
        setLoading(false)
      })
  }, [])

  // Función que elimina un café de la lista cuando se borra
  // Se la pasamos a cada EditCafeCard para que pueda llamarla
  function handleDelete(id) {
    // filter crea un nuevo array sin el café que tiene ese id
    setCafes(cafes.filter(function(cafe) {
      return cafe.id !== id
    }))
  }

  // Pantallas de carga y error
  if (loading) return <p className="edit-status">Cargando cafés...</p>
  if (error) return <p className="edit-status">{error}</p>

  return (
    <div className="edit-page">
      <h1 className="edit-page-title">Editar listado de cafés</h1>

      {/* Lista de tarjetas editables, una por cada café */}
      <div className="edit-list">
        {cafes.map(function(cafe) {
          return (
            // Le pasamos el café y la función de borrar a cada tarjeta
            <EditCafeCard
              key={cafe.id}
              cafe={cafe}
              onDelete={handleDelete}
            />
          )
        })}
      </div>

    </div>
  )
}

export default EditCafes
