// Importamos los estilos globales de la app
import './App.css'

// Importamos las herramientas de React Router para manejar las rutas (páginas)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importamos todas las páginas de la app
import Menu from './pages/Menu'
import CreateCafe from './pages/CreateCafe'
import EditCafes from './pages/EditCafes'
import Login from './pages/Login'
import Register from './pages/Register'

// Importamos los componentes que se ven en todas las páginas
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ProtectedRoute protege páginas que solo se pueden ver si has iniciado sesión
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    // Router envuelve toda la app para que funcione la navegación entre páginas
    <Router>

      {/* El Navbar aparece en todas las páginas porque está fuera de Routes */}
      <Navbar />

      {/* Routes decide qué página mostrar según la URL del navegador */}
      <Routes>
        {/* Cada Route conecta una URL con un componente (página) */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/create-cafe" element={<CreateCafe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Esta ruta está protegida: solo se puede ver si hay sesión iniciada */}
        <Route
          path="/edit-cafes"
          element={
            <ProtectedRoute>
              <EditCafes />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* El Footer también aparece en todas las páginas */}
      <Footer />

    </Router>
  )
}

export default App
