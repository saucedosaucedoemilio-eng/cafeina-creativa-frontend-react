// Importamos Navigate para redirigir al usuario a otra página
import { Navigate } from "react-router-dom"

// ProtectedRoute es un componente que protege páginas privadas
// Si el usuario no ha iniciado sesión, lo manda al login
// Si sí ha iniciado sesión, muestra la página normalmente
function ProtectedRoute({ children }) {

  // Buscamos el token en localStorage (se guarda al hacer login)
  const token = localStorage.getItem("token")

  // Si NO hay token, redirigimos al login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Si SÍ hay token, mostramos la página que estaba dentro de ProtectedRoute
  return children
}

export default ProtectedRoute
