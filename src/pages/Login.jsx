// useState guarda datos que cambian (el formulario, errores, carga)
import { useState } from "react"

// useNavigate nos permite ir a otra página desde código
import { useNavigate } from "react-router-dom"

import "./Auth.css"

function Login() {

  // Estado del formulario: guardamos lo que escribe el usuario
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Estado para mostrar errores al usuario
  const [error, setError] = useState(null)

  // Estado para saber si la petición está en proceso
  const [loading, setLoading] = useState(false)

  // Hook para redirigir al usuario a otra página
  const navigate = useNavigate()

  // Función que se ejecuta cuando el usuario pulsa "Iniciar sesión"
  function handleSubmit(e) {
    // Evitamos que la página se recargue al enviar el formulario
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Hacemos la petición POST al endpoint de login
    fetch("https://cafe-api-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Convertimos el objeto a texto JSON para enviarlo
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(function(response) {
        // Si el servidor responde 401, las credenciales son incorrectas
        if (response.status === 401) {
          setError("Usuario o contraseña incorrectos.")
          setLoading(false)
          return null
        }
        // Si va bien, convertimos la respuesta a objeto JavaScript
        return response.json()
      })
      .then(function(data) {
        // Si data es null significa que hubo error, no hacemos nada
        if (!data) return
        // Guardamos el token en localStorage para recordar la sesión
        localStorage.setItem("token", data.token)
        // Redirigimos al usuario a la página de editar cafés
        navigate("/edit-cafes")
      })
      .catch(function() {
        // Si hay un problema de red u otro error
        setError("Error al conectar con el servidor.")
        setLoading(false)
      })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Iniciar sesión</h1>
        <p className="auth-subtitle">Bienvenido de nuevo ☕</p>

        {/* Formulario de login */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Campo de usuario */}
          <div className="auth-field">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={function(e) { setUsername(e.target.value) }}
              placeholder="Tu usuario"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="auth-field">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={function(e) { setPassword(e.target.value) }}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Mensaje de error (solo aparece si hay error) */}
          {error && <p className="auth-error">{error}</p>}

          {/* Botón de enviar - se desactiva mientras carga */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login
