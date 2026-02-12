import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Users, Heart, Home, LogOut, Briefcase } from 'lucide-react';

export default function AdminLayout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Administrador';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    // Agregamos pb-24 (padding-bottom) en móviles para que el dock no tape el contenido
    <div className="flex min-h-screen bg-surface pb-32 md:pb-0">
      
      {/* --- SIDEBAR (PC) --- */}
      <aside className="w-[300px] bg-white border-r border-outline-variant hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        {/* Logo Section */}
        <div className="px-6 py-6 flex items-center gap-4 border-b border-outline-variant">
          <div className="bg-primary p-2.5 rounded-xl shrink-0 shadow-sm">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-on-surface text-base truncate tracking-tight">FUNSAMEZ</h2>
            <p className="text-xs text-on-surface-variant truncate font-medium">Panel Administrativo</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-6 p-4 bg-secondary-container rounded-2xl flex items-center gap-4 shadow-sm border border-secondary/10">
          <div className="w-12 h-12 shrink-0 bg-white text-secondary rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-on-container truncate leading-tight">{userName}</p>
            <p className="text-sm text-secondary font-medium truncate opacity-90">Administrador</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={22}/>} text="Dashboard" active={isActive('/dashboard')} onClick={() => navigate('/dashboard')} />
          <NavItem icon={<Megaphone size={22}/>} text="Campañas" active={isActive('/admin/campanas')} onClick={() => navigate('/admin/campanas')} />
          <NavItem icon={<Briefcase size={22}/>} text="Convocatorias" active={isActive('/admin/convocatorias')} onClick={() => navigate('/admin/convocatorias')} />
          <NavItem icon={<Users size={22}/>} text="Voluntarios" active={isActive('/admin/voluntarios')} onClick={() => navigate('/admin/voluntarios')} />
          <NavItem icon={<Heart size={22}/>} text="Donaciones" active={isActive('/admin/donaciones')} onClick={() => navigate('/admin/donaciones')} />
          <NavItem icon={<Home size={22}/>} text="Editor de Inicio" active={isActive('/admin/editor-inicio')} onClick={() => navigate('/admin/editor-inicio')} />
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-outline-variant mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-4 text-on-surface-variant hover:text-error transition-colors w-full px-4 py-3.5 rounded-xl hover:bg-error-container/30 group">
            <LogOut size={22} className="group-hover:stroke-error" />
            <span className="text-base font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- DOCK DE NAVEGACIÓN (MÓVIL) --- */}
      <nav className="md:hidden fixed bottom-6 inset-x-4 bg-surface/80 backdrop-blur-xl border border-white/20 z-40 flex items-center justify-around p-2 rounded-3xl shadow-elevation-4">
        <MobileNavItem icon={<LayoutDashboard size={22}/>} text="Inicio" active={isActive('/dashboard')} onClick={() => navigate('/dashboard')} />
        <MobileNavItem icon={<Megaphone size={22}/>} text="Campañas" active={isActive('/admin/campanas')} onClick={() => navigate('/admin/campanas')} />
        <MobileNavItem icon={<Briefcase size={22}/>} text="Convos" active={isActive('/admin/convocatorias')} onClick={() => navigate('/admin/convocatorias')} />
        <MobileNavItem icon={<Users size={22}/>} text="Voluntarios" active={isActive('/admin/voluntarios')} onClick={() => navigate('/admin/voluntarios')} />
        
        {/* Botón Salir pequeño */}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 text-on-surface-variant hover:text-error transition-colors opacity-70 hover:opacity-100">
          <LogOut size={22} />
        </button>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-4 md:p-6 md:ml-[300px] w-full max-w-[100vw] overflow-x-hidden">
        <div className="max-w-6xl mx-auto animate-fade-in">
            {/* Header Dinámico (Solo en PC o si lo deseas en móvil, aquí lo dejamos estándar) */}
            <div className="mb-6 md:mb-8 mt-2 md:mt-0">
                <h1 className="text-headline-small md:text-headline-medium text-on-surface font-bold mb-1 md:mb-2">
                    {title}
                </h1>
                <p className="text-body-medium md:text-body-large text-on-surface-variant">
                    {subtitle}
                </p>
            </div>
            {children}
        </div>
      </main>
    </div>
  );
}

// Subcomponente NavItem (PC)
const NavItem = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all duration-200 ${active ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'}`}
  >
    <span className="shrink-0">{icon}</span>
    <span className="text-base truncate">{text}</span>
  </button>
);

// Subcomponente NavItem (Móvil)
const MobileNavItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
    <div className={`p-1.5 rounded-full transition-all ${active ? 'bg-primary/15' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>{text}</span>
  </button>
);