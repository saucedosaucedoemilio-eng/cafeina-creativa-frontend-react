import { useState } from "react"
import axios from "axios"

// EditCafeCard recibe dos props:
// - cafe: el objeto con los datos del café
// - onDelete: función que avisa al padre cuando se borra el café
function EditCafeCard({ cafe, onDelete }) {

  // Estados para cada campo editable del café
  const [title, setTitle] = useState(cafe.title)
  const [description, setDescription] = useState(cafe.description)
  const [price, setPrice] = useState(cafe.price)
  const [rating, setRating] = useState(cafe.rating)
  const [category, setCategory] = useState(cafe.category)

  // Imagen nueva en base64 (null = no se ha cambiado)
  const [imageBase64, setImageBase64] = useState(null)

  // Estados para feedback al usuario
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Convierte la imagen seleccionada a base64
  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = function() {
      setImageBase64(reader.result)
    }
    reader.readAsDataURL(file)
  }

  // Elimina el café llamando al endpoint DELETE
  function handleDelete() {
    setDeleting(true)
    axios.delete("https://cafe-api-backend.onrender.com/cafes/" + cafe.id)
      .then(function() {
        // Avisamos al componente padre para que quite la tarjeta de la lista
        onDelete(cafe.id)
      })
      .catch(function() {
        setError("Error al eliminar el café.")
        setDeleting(false)
      })
  }

  // Guarda los cambios enviando un PUT a la API
  function handleSave() {
    setSaving(true)

    // Construimos el objeto con todos los datos actualizados
    const cafeActualizado = {
      ...cafe,              // Copiamos los datos originales
      title: title,
      description: description,
      price: Number(price),
      rating: Number(rating),
      category: category,
      // Si se seleccionó imagen nueva usamos esa, si no la original
      "cafe-image": imageBase64 || cafe["cafe-image"],
    }

    axios.put("https://cafe-api-backend.onrender.com/cafes/" + cafe.id, cafeActualizado)
      .then(function() {
        setSuccess(true)
        setError(null)
        setSaving(false)
      })
      .catch(function() {
        setError("Error al guardar los cambios.")
        setSuccess(false)
        setSaving(false)
      })
  }

  return (
    <div className="edit-card">

      {/* Imagen del café con el botón de borrar encima */}
      <div className="edit-card-img-wrapper">
        {/* Si hay imagen nueva (base64) la mostramos, si no la original */}
        <img
          src={imageBase64 || cafe["cafe-image"]}
          alt={cafe.title}
          className="edit-card-img"
        />

        {/* Botón de papelera para eliminar el café */}
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
          title="Eliminar café"
        >
          {deleting ? "..." : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          )}
        </button>
      </div>

      {/* Campos editables del café */}
      <div className="edit-card-fields">

        {/* Campo: nombre */}
        <div className="edit-field">
          <label>Nombre</label>
          <input
            type="text"
            value={title}
            onChange={function(e) { setTitle(e.target.value) }}
          />
        </div>

        {/* Campo: descripción */}
        <div className="edit-field">
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={function(e) { setDescription(e.target.value) }}
            rows={3}
          />
        </div>

        {/* Precio y rating en la misma fila */}
        <div className="edit-field-row">
          <div className="edit-field">
            <label>Precio (€)</label>
            <input
              type="number"
              value={price}
              onChange={function(e) { setPrice(e.target.value) }}
              step="0.01"
              min="0"
            />
          </div>

          <div className="edit-field">
            <label>Rating</label>
            <input
              type="number"
              value={rating}
              onChange={function(e) { setRating(e.target.value) }}
              step="0.1"
              min="0"
              max="5"
            />
          </div>
        </div>

        {/* Campo: imagen nueva (opcional) */}
        <div className="edit-field">
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="edit-file-input"
          />
        </div>

        {/* Campo: categoría */}
        <div className="edit-field">
          <label>Categoría</label>
          <select
            value={category}
            onChange={function(e) { setCategory(e.target.value) }}
          >
            <option value="Cold Brew">Cold Brew</option>
            <option value="Frappuccino">Frappuccino</option>
            <option value="Espresso">Espresso</option>
            <option value="Té Frío">Té Frío</option>
          </select>
        </div>

        {/* Mensajes de éxito y error */}
        {success && <p className="edit-success">Cambios guardados</p>}
        {error && <p className="edit-error">{error}</p>}

        {/* Botón para guardar los cambios */}
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>

      </div>
    </div>
  )
}

export default EditCafeCard
