import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from "./context/AuthContext";

import PointsPage from './pages/PointsPage';
import DeliveriesPage from './pages/DeliveriesPage';
import UsersPage from './pages/UsersPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

import PrivateRoute from './components/PrivateRoute';
import { clearAuth } from './auth';

function AppContent() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">

        {/* NAVBAR SEMPRE VISÍVEL */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">DescarteVivo</Link>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                {user && (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/points">Pontos de Coleta</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/deliveries">Entregas</Link></li>
                    {user.role === "ADMIN" && (
                      <li className="nave-item">
                        <Link className="nav-link" to="/users">Usuários</Link>
                      </li>
                    )}
                  </>
                )}
              </ul>

              <ul className="navbar-nav ms-auto">
                {!user && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                )}

                {user && (
                  <>
                    < li className="nav-item d-flex align-items-center me-2 text-white">
                      Olá, <strong className='ms-1'>{user.name}</strong>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Sair</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* ROTAS */}
        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/points" element={<PrivateRoute><PointsPage /></PrivateRoute>} />
            <Route path="/deliveries" element={<PrivateRoute><DeliveriesPage /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-success text-center py-3 text-white opacity-75">
          <small>DescarteVivo - ODS 11: Cidades e Comunidades Sustentáveis</small>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
