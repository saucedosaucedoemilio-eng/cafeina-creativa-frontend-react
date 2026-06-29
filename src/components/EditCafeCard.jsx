import { useState } from "react";
import axios from "axios";

function EditCafeCard({ cafe, onDelete }) {
  const [formData, setFormData] = useState({
    title: cafe.title,
    description: cafe.description,
    price: cafe.price,
    rating: cafe.rating,
    category: cafe.category,
  });
  const [imageBase64, setImageBase64] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
    setError(null);
  };

  const handleDelete = () => {
    setDeleting(true);
    axios
      .delete(`https://cafe-api-backend.onrender.com/cafes/${cafe.id}`)
      .then(() => {
        onDelete(cafe.id);
      })
      .catch(() => {
        setError("Error al eliminar el café.");
        setDeleting(false);
      });
  };

  const handleSave = () => {
    setSaving(true);
    const updatedCafe = {
      ...cafe,
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      rating: Number(formData.rating),
      category: formData.category,
      "cafe-image": imageBase64 || cafe["cafe-image"],
    };

    axios
      .put(`https://cafe-api-backend.onrender.com/cafes/${cafe.id}`, updatedCafe)
      .then(() => {
        setSuccess(true);
        setError(null);
        setSaving(false);
      })
      .catch(() => {
        setError("Error al guardar los cambios.");
        setSuccess(false);
        setSaving(false);
      });
  };

  return (
    <div className="edit-card">
      <div className="edit-card-img-wrapper">
        <img
          src={imageBase64 || cafe["cafe-image"]}
          alt={cafe.title}
          className="edit-card-img"
        />
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


      <div className="edit-card-fields">
        <div className="edit-field">
          <label>Nombre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="edit-field">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="edit-field-row">
          <div className="edit-field">
            <label>Precio (€)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className="edit-field">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="5"
            />
          </div>
        </div>

        <div className="edit-field">
          <label>Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="edit-file-input"
          />
        </div>

        <div className="edit-field">
          <label>Categoría</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Cold Brew">Cold Brew</option>
            <option value="Frappuccino">Frappuccino</option>
            <option value="Espresso">Espresso</option>
            <option value="Té Frío">Té Frío</option>
          </select>
        </div>

        {success && <p className="edit-success">Cambios guardados</p>}
        {error && <p className="edit-error">{error}</p>}

        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

export default EditCafeCard;
