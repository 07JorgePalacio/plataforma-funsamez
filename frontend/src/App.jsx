import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; // <--- IMPORTAR
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminConvocationsPage from './pages/AdminConvocationsPage';

function App() {
  return (
    <AppProvider> {/* <--- ENVOLVER TODO AQUÍ */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/convocatorias" element={<AdminConvocationsPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider> // <--- CIERRE
  );
}

export default App;