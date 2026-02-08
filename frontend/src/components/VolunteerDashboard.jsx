import { useState, useEffect } from 'react';
import { LayoutDashboard, User, Briefcase, FileText, LogOut, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Recuperamos el nombre guardado en el Login
    const name = localStorage.getItem('user_name') || 'Voluntario';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-brand-beige">
      
      {/* --- SIDEBAR (Barra Lateral) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-brand-gold p-2 rounded-lg text-white">
            {/* Simulación del Logo */}
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-sm">FUNSAMEZ</h2>
            <p className="text-xs text-gray-500">Portal Voluntario</p>
          </div>
        </div>

        {/* Tarjeta de Usuario en Sidebar */}
        <div className="mx-4 mb-6 p-4 bg-brand-beige rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e0d8c0] rounded-full flex items-center justify-center text-brand-gold font-bold">
            {userName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">Voluntario Activo</p>
          </div>
        </div>

        {/* Menú de Navegación */}
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} text="Inicio" active />
          <NavItem icon={<User size={20}/>} text="Mi Perfil" />
          <NavItem icon={<Briefcase size={20}/>} text="Convocatorias" />
          <NavItem icon={<FileText size={20}/>} text="Mis Postulaciones" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors w-full px-4 py-3 rounded-xl hover:bg-red-50">
            <LogOut size={20} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">¡Hola, {userName.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 mt-2">Bienvenido a tu portal. Aquí puedes gestionar tu perfil y postulaciones.</p>
        </header>

        {/* Stats Cards (Métricas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={<Briefcase className="text-brand-gold" />} 
            value="3" 
            label="Convocatorias Abiertas" 
          />
          <StatCard 
            icon={<Clock className="text-orange-400" />} 
            value="1" 
            label="Postulaciones Pendientes" 
          />
          <StatCard 
            icon={<div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center text-xs font-bold text-green-500">✓</div>} 
            value="0" 
            label="Posiciones Activas" 
          />
        </div>

        {/* Grid Inferior (Listas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Convocatorias Recientes */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Convocatorias Recientes</h3>
              <a href="#" className="text-sm text-brand-gold hover:underline">Ver todas</a>
            </div>
            
            <div className="space-y-4">
              <JobItem 
                title="Tutor de Matemáticas" 
                time="5 horas/semana" 
                location="Centro Comunitario La Esperanza"
              />
              <JobItem 
                title="Logística de Eventos" 
                time="Fines de semana" 
                location="Variable"
              />
            </div>
          </div>

          {/* Estado de Postulaciones */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Estado de Postulaciones</h3>
              <a href="#" className="text-sm text-brand-gold hover:underline">Ver todas</a>
            </div>

            <div className="p-4 bg-brand-beige rounded-2xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-800">Tutor de Matemáticas</h4>
                <p className="text-xs text-gray-500 mt-1">Aplicado el 2026-02-05</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                Pendiente
              </span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- Subcomponentes para mantener el código limpio ---

const NavItem = ({ icon, text, active }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
    {icon}
    <span className="text-sm">{text}</span>
  </button>
);

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <div className="p-3 bg-brand-beige rounded-xl w-fit mb-4">{icon}</div>
      <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
    <div className="text-gray-300">→</div>
  </div>
);

const JobItem = ({ title, time, location }) => (
  <div className="p-4 bg-brand-beige/50 rounded-2xl hover:bg-brand-beige transition-colors cursor-pointer">
    <h4 className="font-bold text-gray-800">{title}</h4>
    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
      <div className="flex items-center gap-1"><Clock size={12}/> {time}</div>
      <div className="flex items-center gap-1"><MapPin size={12}/> {location}</div>
    </div>
  </div>
);

export default VolunteerDashboard;