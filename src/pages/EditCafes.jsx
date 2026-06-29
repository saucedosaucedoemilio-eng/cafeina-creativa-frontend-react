import { useState, useEffect } from "react";
import axios from "axios";
import EditCafeCard from "../components/EditCafeCard";
import "./EditCafes.css";

function EditCafes() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5005/cafes")
      .then((response) => {
        setCafes(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar los cafés.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="edit-status">Cargando cafés...</p>;
  if (error) return <p className="edit-status">{error}</p>;

  const handleDelete = (id) => {
    setCafes((prev) => prev.filter((cafe) => cafe.id !== id));
  };

  return (
    <div className="edit-page">
      <h1 className="edit-page-title">Editar listado de cafés</h1>
      <div className="edit-list">
        {cafes.map((cafe) => (
          <EditCafeCard key={cafe.id} cafe={cafe} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default EditCafes;
