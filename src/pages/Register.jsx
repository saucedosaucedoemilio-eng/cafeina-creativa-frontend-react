import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Auth.css"

function Register() {

  // Un estado por cada campo del formulario
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmar, setConfirmar] = useState("")

  // Estado para mostrar errores
  const [error, setError] = useState(null)

  // Estado para saber si está cargando
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Función que se ejecuta al enviar el formulario
  function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Comprobamos que las dos contraseñas sean iguales
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setLoading(true)

    // Primero comprobamos si el email ya está registrado
    axios.get("https://cafe-api-backend.onrender.com/usuarios?email=" + email)
      .then(function(response) {

        // Si ya existe un usuario con ese email, mostramos error
        if (response.data.length > 0) {
          setError("Ya existe una cuenta con ese email.")
          setLoading(false)
          return
        }

        // Si el email no existe, creamos el nuevo usuario con POST
        const nuevoUsuario = {
          nombre: nombre,
          email: email,
          password: password,
        }

        axios.post("https://cafe-api-backend.onrender.com/usuarios", nuevoUsuario)
          .then(function(response) {
            // Guardamos el usuario en localStorage
            localStorage.setItem("usuario", JSON.stringify(response.data))
            // Redirigimos al menú
            navigate("/menu")
          })
          .catch(function() {
            setError("Error al crear la cuenta.")
            setLoading(false)
          })

      })
      .catch(function() {
        setError("Error al conectar con el servidor.")
        setLoading(false)
      })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Únete a Cafeína Creativa ☕</p>

        {/* Formulario de registro */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Campo nombre */}
          <div className="auth-field">
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={function(e) { setNombre(e.target.value) }}
              placeholder="Tu nombre"
              required
            />
          </div>

          {/* Campo email */}
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={function(e) { setEmail(e.target.value) }}
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Campo contraseña */}
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

          {/* Campo confirmar contraseña */}
          <div className="auth-field">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmar}
              onChange={function(e) { setConfirmar(e.target.value) }}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Mensaje de error */}
          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

        </form>

        {/* Enlace para ir al login si ya tienes cuenta */}
        <p className="auth-switch">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="auth-link">Inicia sesión</Link>
        </p>

      </div>
    </div>
  )
}

export default Register
