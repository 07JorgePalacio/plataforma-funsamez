import { useState, useEffect } from 'react';
import { LayoutDashboard, Megaphone, Users, Heart, Home, LogOut, DollarSign, ArrowRight, Briefcase } from 'lucide-react'; // <--- Agregué Briefcase
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Administrador';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-brand-beige">
      
      {/* --- SIDEBAR ADMIN --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10"> {/* Fixed para que no scrollee el menú */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-brand-gold p-2 rounded-lg text-white">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-sm">FUNSAMEZ</h2>
            <p className="text-xs text-gray-500">Panel Administrativo</p>
          </div>
        </div>

        <div className="mx-4 mb-6 p-4 bg-brand-beige rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">Admin Principal</p>
            <p className="text-xs text-gray-500 truncate">Administrador</p>
          </div>
        </div>

        {/* Menú Actualizado */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active />
          <NavItem icon={<Megaphone size={20}/>} text="Campañas" />
          <NavItem icon={<Briefcase size={20}/>} text="Convocatorias" /> {/* <--- NUEVO */}
          <NavItem icon={<Users size={20}/>} text="Voluntarios" />
          <NavItem icon={<Heart size={20}/>} text="Donaciones" />
          <NavItem icon={<Home size={20}/>} text="Editor de Inicio" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors w-full px-4 py-3 rounded-xl hover:bg-red-50">
            <LogOut size={20} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      {/* ml-64 para compensar el sidebar fijo */}
      <main className="flex-1 p-8 ml-64"> 
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-500 mt-2">Bienvenido al centro de control. Gestiona campañas, voluntarios y donaciones.</p>
        </header>

        {/* 4 Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Megaphone className="text-brand-gold" />} 
            value="3" 
            label="Campañas Activas" 
          />
          <StatCard 
            icon={<Users className="text-blue-500" />} 
            value="1" 
            label="Postulaciones Pendientes" 
          />
          <StatCard 
            icon={<Heart className="text-red-500" />} 
            value="2" 
            label="Donaciones del Mes" 
          />
          <StatCard 
            icon={<DollarSign className="text-green-600" />} 
            value="$150 K" 
            label="Total Recaudado" 
          />
        </div>

        {/* Grid Inferior - ALINEACIÓN ARREGLADA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"> {/* items-stretch es clave */}
          
          {/* Columna Izquierda: Campañas (Con h-full) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Campañas Recientes</h3>
              <a href="#" className="text-sm text-brand-gold hover:underline">Ver todas</a>
            </div>
            
            <div className="space-y-4 flex-1"> {/* flex-1 para ocupar espacio si falta contenido */}
              <CampaignItem 
                title="Educación Primera Infancia" 
                percent="70%" 
                type="Monetaria"
                color="bg-orange-100 text-orange-700"
              />
              <CampaignItem 
                title="Ropero Solidario" 
                percent="N/A" 
                type="Especie"
                color="bg-blue-100 text-blue-700"
              />
              <CampaignItem 
                title="Mercados para Familias" 
                percent="40%" 
                type="Mixta"
                color="bg-green-100 text-green-700"
              />
            </div>
          </div>

          {/* Columna Derecha: Postulaciones (Con h-full) */}
          <div className="bg-brand-beige p-6 rounded-3xl border border-gray-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-gray-800">Postulaciones Pendientes</h3>
              <a href="#" className="text-sm text-brand-gold hover:underline">Ver todas</a>
            </div>

            <div className="space-y-4 flex-1">
               {/* Tarjeta de Ejemplo */}
               <div className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">MG</div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">María García López</h4>
                    <p className="text-xs text-gray-500">Tutor de Matemáticas</p>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg flex items-center gap-1">
                    📅 2026-02-05
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// --- Subcomponentes ---
const NavItem = ({ icon, text, active }) => (
  <button className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${active ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
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
    <div className="text-gray-300"><ArrowRight size={18}/></div>
  </div>
);

const CampaignItem = ({ title, percent, type, color }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl" />
      <div>
        <h4 className="font-bold text-gray-800">{title}</h4>
        <span className={`px-2 py-0.5 rounded text-xs font-bold ${color} mt-1 inline-block`}>{type}</span>
      </div>
    </div>
    <div className="text-right">
      <p className="font-bold text-brand-gold">{percent}</p>
      <p className="text-xs text-gray-400">recaudado</p>
    </div>
  </div>
);

export default AdminDashboard;