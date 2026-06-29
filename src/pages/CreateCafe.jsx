import { useState } from "react";
import axios from "axios";
import "./CreateCafe.css";

function CreateCafe() {
  // Estado del formulario — guarda lo que el usuario escribe en cada campo
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    category: "Cold Brew", // Categoría por defecto
  });

  // Guarda la imagen convertida a base64 para poder enviarla como texto
  const [imageBase64, setImageBase64] = useState(null);
  // true cuando el café se creó correctamente
  const [success, setSuccess] = useState(false);
  // Guarda el mensaje de error si algo falla
  const [error, setError] = useState(null);

  // Actualiza el campo correspondiente del formulario cuando el usuario escribe
  const handleChange = (e) => {
    // [e.target.name] usa el atributo "name" del input como clave dinámica
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convierte la imagen seleccionada a base64 para poder enviarla a la API
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Si no eligió archivo, no hace nada

    const reader = new FileReader();
    // Cuando termina de leer, guarda el resultado en el estado
    reader.onloadend = () => {
      setImageBase64(reader.result); // reader.result es la imagen en base64
    };
    reader.readAsDataURL(file); // Inicia la lectura como URL de datos
  };

  // Se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al hacer submit

    // Arma el objeto con los datos del nuevo café
    const newCafe = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),   // Convierte string a número
      rating: Number(formData.rating), // Convierte string a número
      category: formData.category,
      "cafe-image": imageBase64,       // Imagen en base64
      userId: 1,
    };

    // Envía el nuevo café a la API con un POST
    axios
      .post("https://cafe-api-backend.onrender.com/cafes", newCafe)
      .then(() => {
        setSuccess(true);  // Muestra mensaje de éxito
        setError(null);
        // Limpia el formulario para poder crear otro café
        setFormData({ title: "", description: "", price: "", rating: "", category: "Cold Brew" });
        setImageBase64(null);
      })
      .catch(() => {
        setError("Error al crear el café. Inténtalo de nuevo."); // Muestra error
        setSuccess(false);
      });
  };

  return (
    <div className="create-page">
      <h1 className="create-title">Crear nuevo café</h1>

      {/* onSubmit llama a handleSubmit cuando el usuario presiona el botón */}
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del café</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej: Frosted Velvet"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe el café..."
            rows={4}
            required
          />
        </div>

        {/* Fila con dos campos lado a lado */}
        <div className="form-row">
          <div className="form-group">
            <label>Precio (€)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
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
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Ej: 4.8"
              step="0.1"
              min="0"
              max="5"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Categoría</label>
          {/* Desplegable para elegir categoría */}
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Cold Brew">Cold Brew</option>
            <option value="Frappuccino">Frappuccino</option>
            <option value="Espresso">Espresso</option>
            <option value="Té Frío">Té Frío</option>
          </select>
        </div>

        <div className="form-group">
          <label>Imagen del café</label>
          {/* Input de archivo — solo acepta imágenes */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
            required
          />
          {/* Muestra la preview solo si ya se eligió una imagen */}
          {imageBase64 && (
            <img src={imageBase64} alt="Preview" className="image-preview" />
          )}
        </div>

        {/* Mensajes de éxito o error tras enviar */}
        {success && <p className="form-success">¡Café creado con éxito!</p>}
        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="submit-btn">Crear café</button>
      </form>
    </div>
  );
}

export default CreateCafe;
