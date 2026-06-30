import { useState } from "react"
import axios from "axios"
import "./CreateCafe.css"

function CreateCafe() {

  // Un estado por cada campo del formulario
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [rating, setRating] = useState("")
  const [category, setCategory] = useState("Cold Brew")

  // Guardamos la imagen convertida a base64
  const [imageBase64, setImageBase64] = useState(null)

  // Estado para mostrar mensaje de éxito
  const [success, setSuccess] = useState(false)

  // Estado para mostrar errores
  const [error, setError] = useState(null)

  // Función que convierte la imagen a base64 cuando el usuario la selecciona
  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return

    // FileReader convierte el archivo a texto base64
    const reader = new FileReader()
    reader.onloadend = function() {
      // reader.result es el string base64 de la imagen
      setImageBase64(reader.result)
    }
    reader.readAsDataURL(file)
  }

  // Función que se ejecuta al enviar el formulario
  function handleSubmit(e) {
    // Evitamos que la página se recargue
    e.preventDefault()

    // Construimos el objeto con los datos del nuevo café
    const nuevoCafe = {
      title: title,
      description: description,
      price: Number(price),     // Convertimos el string a número
      rating: Number(rating),   // Convertimos el string a número
      category: category,
      "cafe-image": imageBase64, // La imagen en formato base64
      userId: 1,
    }

    // Enviamos el nuevo café a la API con POST
    axios.post("https://cafe-api-backend.onrender.com/cafes", nuevoCafe)
      .then(function() {
        // Si fue bien, mostramos éxito y limpiamos el formulario
        setSuccess(true)
        setError(null)
        setTitle("")
        setDescription("")
        setPrice("")
        setRating("")
        setCategory("Cold Brew")
        setImageBase64(null)
      })
      .catch(function() {
        // Si hubo error, lo mostramos
        setError("Error al crear el café. Inténtalo de nuevo.")
        setSuccess(false)
      })
  }

  return (
    <div className="create-page">
      <h1 className="create-title">Crear nuevo café</h1>

      {/* Formulario para crear un café */}
      <form className="create-form" onSubmit={handleSubmit}>

        {/* Campo: nombre del café */}
        <div className="form-group">
          <label>Nombre del café</label>
          <input
            type="text"
            value={title}
            onChange={function(e) { setTitle(e.target.value) }}
            placeholder="Ej: Frosted Velvet"
            required
          />
        </div>

        {/* Campo: descripción */}
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={description}
            onChange={function(e) { setDescription(e.target.value) }}
            placeholder="Describe el café..."
            rows={4}
            required
          />
        </div>

        {/* Fila con precio y rating uno al lado del otro */}
        <div className="form-row">
          <div className="form-group">
            <label>Precio (€)</label>
            <input
              type="number"
              value={price}
              onChange={function(e) { setPrice(e.target.value) }}
              placeholder="Ej: 4.50"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <input
              type="number"
              value={rating}
              onChange={function(e) { setRating(e.target.value) }}
              placeholder="Ej: 4.8"
              step="0.1"
              min="0"
              max="5"
              required
            />
          </div>
        </div>

        {/* Campo: categoría (desplegable) */}
        <div className="form-group">
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

        {/* Campo: imagen (se convierte a base64) */}
        <div className="form-group">
          <label>Imagen del café</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
            required
          />
          {/* Preview de la imagen seleccionada */}
          {imageBase64 && (
            <img src={imageBase64} alt="Preview" className="image-preview" />
          )}
        </div>

        {/* Mensajes de éxito o error */}
        {success && <p className="form-success">¡Café creado con éxito!</p>}
        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="submit-btn">Crear café</button>

      </form>
    </div>
  )
}

export default CreateCafe
