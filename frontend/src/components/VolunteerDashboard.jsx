import { useState, useEffect } from 'react';
import { LayoutDashboard, User, Briefcase, FileText, LogOut, MapPin, Clock, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  // Datos de ejemplo (reemplazar con useApp y useAuth cuando estén disponibles)
  const user = {
    id: 1,
    name: localStorage.getItem('user_name') || 'María García López'
  };

  const convocations = [
    {
      id: 1,
      title: 'Tutor de Matemáticas',
      commitment: '5 horas/semana',
      location: 'Centro Comunitario La Esperanza',
      status: 'open'
    },
    {
      id: 2,
      title: 'Logística de Eventos',
      commitment: 'Fines de semana (según eventos)',
      location: 'Variable',
      status: 'open'
    },
    {
      id: 3,
      title: 'Apoyo Educativo',
      commitment: '3 horas/semana',
      location: 'Virtual',
      status: 'open'
    }
  ];

  const myApplications = [
    {
      id: 1,
      convocationTitle: 'Tutor de Matemáticas',
      status: 'pending',
      appliedAt: '2024-03-15'
    }
  ];

  const pendingApplications = myApplications.filter(a => a.status === 'pending');
  const acceptedApplications = myApplications.filter(a => a.status === 'accepted');

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Voluntario';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const stats = [
    {
      label: 'Convocatorias Abiertas',
      value: convocations.filter(c => c.status === 'open').length,
      icon: Briefcase,
      color: 'primary',
      link: '/voluntario/convocatorias'
    },
    {
      label: 'Postulaciones Pendientes',
      value: pendingApplications.length,
      icon: Clock,
      color: 'warning',
      link: '/voluntario/postulaciones'
    },
    {
      label: 'Posiciones Activas',
      value: acceptedApplications.length,
      icon: CheckCircle2,
      color: 'success',
      link: '/voluntario/postulaciones'
    },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      
      {/* --- SIDEBAR (MANTENIDO DEL DISEÑO ACTUAL) --- */}
      <aside className="w-[280px] bg-white border-r border-outline-variant hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        
        {/* Logo Section */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-outline-variant">
          <div className="bg-primary p-2 rounded-lg shrink-0">
            <div className="w-5 h-5 bg-white/20 rounded-full" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-on-surface text-sm truncate">FUNSAMEZ</h2>
            <p className="text-xs text-on-surface-variant truncate">Portal Voluntario</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-4 p-3 bg-surface-container rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-on-surface truncate">{userName}</p>
            <p className="text-xs text-on-surface-variant truncate">voluntario@funsamez.org</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={18}/>} 
            text="Inicio" 
            active={activeNav === 'home'}
            onClick={() => setActiveNav('home')}
          />
          <NavItem 
            icon={<User size={18}/>} 
            text="Mi Perfil" 
            active={activeNav === 'profile'}
            onClick={() => setActiveNav('profile')}
          />
          <NavItem 
            icon={<Briefcase size={18}/>} 
            text="Convocatorias" 
            active={activeNav === 'jobs'}
            onClick={() => setActiveNav('jobs')}
          />
          <NavItem 
            icon={<FileText size={18}/>} 
            text="Mis Postulaciones" 
            active={activeNav === 'applications'}
            onClick={() => setActiveNav('applications')}
          />
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-outline-variant">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 text-on-surface-variant hover:text-error transition-colors w-full px-3 py-2.5 rounded-lg hover:bg-error-container/20"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL (NUEVO DISEÑO MATERIAL 3) --- */}
      <main className="flex-1 p-6 md:ml-[280px] overflow-y-auto">
        <div className="max-w-5xl mx-auto animate-fade-in">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-headline-medium text-on-surface font-bold mb-2">
              ¡Hola, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-body-large text-on-surface-variant">
              Bienvenido a tu portal de voluntariado. Aquí puedes gestionar tu perfil y postulaciones.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Link
                key={index}
                to={stat.link}
                className="card-elevated group hover:scale-[1.02] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${stat.color === 'primary' ? 'bg-primary/10' : ''}
                    ${stat.color === 'warning' ? 'bg-warning-container' : ''}
                    ${stat.color === 'success' ? 'bg-success-container' : ''}
                  `}>
                    <stat.icon className={`w-6 h-6
                      ${stat.color === 'primary' ? 'text-primary' : ''}
                      ${stat.color === 'warning' ? 'text-warning' : ''}
                      ${stat.color === 'success' ? 'text-success' : ''}
                    `} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant 
                    group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-display-small text-on-surface font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-body-medium text-on-surface-variant">
                  {stat.label}
                </p>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6">
            
            {/* Recent Convocations */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-large text-on-surface font-medium">
                  Convocatorias Recientes
                </h2>
                <Link to="/voluntario/convocatorias" className="btn-text text-primary">
                  Ver todas
                </Link>
              </div>
              <div className="space-y-4">
                {convocations.slice(0, 2).map(convocation => (
                  <div
                    key={convocation.id}
                    className="p-4 rounded-xl bg-surface-container hover:bg-surface-container-high 
                      transition-colors"
                  >
                    <h3 className="text-title-medium text-on-surface font-medium mb-2">
                      {convocation.title}
                    </h3>
                    <div className="flex items-center gap-4 text-body-small text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {convocation.commitment}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {convocation.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Applications Status */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-large text-on-surface font-medium">
                  Estado de Postulaciones
                </h2>
                <Link to="/voluntario/postulaciones" className="btn-text text-primary">
                  Ver todas
                </Link>
              </div>

              {myApplications.length > 0 ? (
                <div className="space-y-4">
                  {myApplications.slice(0, 3).map(application => (
                    <div
                      key={application.id}
                      className="p-4 rounded-xl bg-surface-container flex items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-title-small text-on-surface font-medium truncate">
                          {application.convocationTitle}
                        </h3>
                        <p className="text-body-small text-on-surface-variant">
                          Aplicado el {application.appliedAt}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-label-small font-medium
                        ${application.status === 'pending' ? 'bg-warning-container text-warning' : ''}
                        ${application.status === 'accepted' ? 'bg-success-container text-success' : ''}
                        ${application.status === 'rejected' ? 'bg-error-container text-error' : ''}
                      `}>
                        {application.status === 'pending' && 'Pendiente'}
                        {application.status === 'accepted' && 'Aceptado'}
                        {application.status === 'rejected' && 'Rechazado'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-on-surface-variant mx-auto mb-4" />
                  <p className="text-body-medium text-on-surface-variant">
                    Aún no tienes postulaciones
                  </p>
                  <Link to="/voluntario/convocatorias" className="btn-tonal mt-4">
                    Explorar Convocatorias
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 
            border border-primary/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-title-large text-on-surface font-medium mb-2">
                  ¡Gracias por ser voluntario!
                </h3>
                <p className="text-body-medium text-on-surface-variant">
                  Tu dedicación y tiempo hacen posible que sigamos transformando vidas.
                  Juntos somos más fuertes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- COMPONENTE DE NAVEGACIÓN ---
const NavItem = ({ icon, text, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all
        ${active 
          ? 'bg-primary/10 text-primary font-semibold' 
          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-sm truncate">{text}</span>
    </button>
  );
};

export default VolunteerDashboard;
