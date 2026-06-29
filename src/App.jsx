import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import CreateCafe from './pages/CreateCafe';
import EditCafes from './pages/EditCafes';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/create-cafe" element={<CreateCafe />} />
        <Route path="/edit-cafes" element={<ProtectedRoute><EditCafes /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
