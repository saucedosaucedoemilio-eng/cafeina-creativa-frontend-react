import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    // Comprueba que el email no esté ya registrado
    axios
      .get(`https://cafe-api-backend.onrender.com/usuarios?email=${formData.email}`)
      .then((response) => {
        if (response.data.length > 0) {
          setError("Ya existe una cuenta con ese email.");
          setLoading(false);
          return;
        }

        const nuevoUsuario = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        };

        return axios.post("https://cafe-api-backend.onrender.com/usuarios", nuevoUsuario);
      })
      .then((response) => {
        if (!response) return;
        localStorage.setItem("usuario", JSON.stringify(response.data));
        navigate("/menu");
      })
      .catch(() => {
        setError("Error al conectar con el servidor.");
        setLoading(false);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Únete a Cafeína Creativa ☕</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="auth-field">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="auth-field">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmar"
              value={formData.confirmar}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="auth-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
