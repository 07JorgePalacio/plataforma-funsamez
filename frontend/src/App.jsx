import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import PublicLayout from './pages/public/PublicLayout';
import PublicCampaignsPage from './pages/public/PublicCampaignsPage';

// --- 1. Importaciones de Admin  ---
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminConvocationsPage from './pages/admin/AdminConvocationsPage';
import AdminCampaignsPage from './pages/admin/AdminCampaignsPage';
import VolunteersPage from './pages/admin/VolunteersPage'; //

// --- 2. Importaciones de Voluntario ---
import VolunteerLayout from './pages/volunteer/VolunteerLayout';
import VolunteerDashboard from './pages/volunteer/VolunteerDashboard';
import ProfilePage from './pages/volunteer/ProfilePage';
import ConvocationsPage from './pages/volunteer/ConvocationsPage';
import MyApplicationsPage from './pages/volunteer/MyApplicationsPage';

function App() {
  return (
    <AppProvider> 
      <BrowserRouter>
        <Routes>
          {/* RUTAS PÚBLICAS (Con Header y Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Navigate to="/campanas" replace />} />
            <Route path="/campanas" element={<PublicCampaignsPage />} />
            {/* Aquí agregaremos convocatorias en el siguiente paso */}
          </Route>
          
          {/* RUTAS DE AUTENTICACIÓN (Sin Header) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* RUTAS DEL ADMIN (Protegidas por su Layout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="convocatorias" element={<AdminConvocationsPage />} />
            <Route path="campanas" element={<AdminCampaignsPage />} />
            <Route path="voluntarios" element={<VolunteersPage />} />
          </Route>

          {/* RUTAS DEL VOLUNTARIO (Protegidas por su Layout) */}
          <Route path="/voluntario" element={<VolunteerLayout />}>
            <Route index element={<VolunteerDashboard />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="convocatorias" element={<ConvocationsPage />} />
            <Route path="postulaciones" element={<MyApplicationsPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;