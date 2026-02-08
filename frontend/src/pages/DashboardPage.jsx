import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerDashboard from '../components/VolunteerDashboard';
import AdminDashboard from '../components/AdminDashboard'; // <--- IMPORTAR

const DashboardPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    const savedRole = localStorage.getItem('user_role');
    setRole(savedRole);
  }, [navigate]);

  if (!role) return <div className="min-h-screen flex items-center justify-center bg-brand-beige">Cargando...</div>;

  // --- LÓGICA DE SELECCIÓN ---
  // Si el backend dice que eres staff o superuser, te mostramos el AdminDashboard
  if (role === 'admin' || role === 'administrador' || role === 'superuser') {
    return <AdminDashboard />;
  }

  // Si no, eres voluntario
  return <VolunteerDashboard />;
};

export default DashboardPage;