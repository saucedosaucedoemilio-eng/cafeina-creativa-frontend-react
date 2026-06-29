import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://cafe-api-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          setError("Credenciales incorrectas.");
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (!data) return;
        localStorage.setItem("token", data.token);
        navigate("/edit-cafes");
      })
      .catch(() => {
        setError("Error al conectar con el servidor.");
        setLoading(false);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>
        <p className="auth-subtitle">Bienvenido de nuevo ☕</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tu usuario"
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

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth-switch">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="auth-link">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
