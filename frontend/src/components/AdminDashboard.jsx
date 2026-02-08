import { useState, useEffect } from 'react';
import { LayoutDashboard, Megaphone, Users, Heart, Home, LogOut, Briefcase, DollarSign, ArrowRight, TrendingUp, Calendar, Package } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeNav, setActiveNav] = useState('dashboard');

  // Datos de ejemplo (reemplazar con useApp cuando esté disponible)
  const campaigns = [
    {
      id: 1,
      title: 'Educación Primera Infancia',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: true,
      acceptsInKind: false,
      goalAmount: 1000000,
      raisedAmount: 700000,
      status: 'active'
    },
    {
      id: 2,
      title: 'Ropero Solidario',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: false,
      acceptsInKind: true,
      status: 'active'
    },
    {
      id: 3,
      title: 'Mercados para Familias',
      image: 'https://via.placeholder.com/100',
      acceptsMoney: true,
      acceptsInKind: true,
      goalAmount: 500000,
      raisedAmount: 200000,
      status: 'active'
    },
  ];

  const applications = [
    {
      id: 1,
      volunteerName: 'María García López',
      convocationTitle: 'Tutor de Matemáticas',
      status: 'pending',
      appliedAt: '2024-03-15'
    }
  ];

  const donations = [
    { id: 1, type: 'money', status: 'completed', amount: 150000 }
  ];

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Administrador';
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const totalRaised = donations
    .filter(d => d.type === 'money' && d.status === 'completed')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const stats = [
    {
      label: 'Campañas Activas',
      value: campaigns.filter(c => c.status === 'active').length,
      icon: Megaphone,
      color: 'primary',
      link: '/admin/campanas',
    },
    {
      label: 'Postulaciones Pendientes',
      value: applications.filter(a => a.status === 'pending').length,
      icon: Users,
      color: 'secondary',
      link: '/admin/voluntarios',
    },
    {
      label: 'Donaciones del Mes',
      value: donations.length,
      icon: Heart,
      color: 'error',
      link: '/admin/donaciones',
    },
    {
      label: 'Total Recaudado',
      value: new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: 'compact',
      }).format(totalRaised),
      icon: DollarSign,
      color: 'success',
      link: '/admin/donaciones',
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
            <p className="text-xs text-on-surface-variant truncate">Panel Administrativo</p>
          </div>
        </div>

        {/* User Card */}
        <div className="mx-4 my-4 p-3 bg-surface-container rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-on-surface truncate">Administrador FUNSAMEZ</p>
            <p className="text-xs text-on-surface-variant truncate">Administrador</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={18}/>} 
            text="Dashboard" 
            active={activeNav === 'dashboard'}
            onClick={() => setActiveNav('dashboard')}
          />
          <NavItem 
            icon={<Megaphone size={18}/>} 
            text="Campañas" 
            active={activeNav === 'campaigns'}
            onClick={() => setActiveNav('campaigns')}
          />
          <NavItem 
            icon={<Briefcase size={18}/>} 
            text="Convocatorias" 
            active={activeNav === 'jobs'}
            onClick={() => setActiveNav('jobs')}
          />
          <NavItem 
            icon={<Users size={18}/>} 
            text="Voluntarios" 
            active={activeNav === 'volunteers'}
            onClick={() => setActiveNav('volunteers')}
          />
          <NavItem 
            icon={<Heart size={18}/>} 
            text="Donaciones" 
            active={activeNav === 'donations'}
            onClick={() => setActiveNav('donations')}
          />
          <NavItem 
            icon={<Home size={18}/>} 
            text="Editor de Inicio" 
            active={activeNav === 'home-editor'}
            onClick={() => setActiveNav('home-editor')}
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
      <main className="flex-1 p-6 md:ml-[280px]">
        <div className="max-w-6xl mx-auto animate-fade-in">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-headline-medium text-on-surface font-bold mb-2">
              Panel de Administración
            </h1>
            <p className="text-body-large text-on-surface-variant">
              Bienvenido al centro de control de FUNSAMEZ. Gestiona campañas, voluntarios y donaciones.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Link
                key={index}
                to={stat.link}
                className="card-elevated group hover:scale-[1.02] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${stat.color === 'primary' ? 'bg-primary/10' : ''}
                    ${stat.color === 'secondary' ? 'bg-secondary/10' : ''}
                    ${stat.color === 'error' ? 'bg-error/10' : ''}
                    ${stat.color === 'success' ? 'bg-success/10' : ''}
                  `}>
                    <stat.icon className={`w-6 h-6
                      ${stat.color === 'primary' ? 'text-primary' : ''}
                      ${stat.color === 'secondary' ? 'text-secondary' : ''}
                      ${stat.color === 'error' ? 'text-error' : ''}
                      ${stat.color === 'success' ? 'text-success' : ''}
                    `} />
                  </div>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant 
                    group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-headline-small text-on-surface font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-body-medium text-on-surface-variant">
                  {stat.label}
                </p>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            
            {/* Recent Campaigns */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-large text-on-surface font-medium">
                  Campañas Recientes
                </h2>
                <Link to="/admin/campanas" className="btn-text text-primary">
                  Ver todas
                </Link>
              </div>
              <div className="space-y-3">
                {campaigns.slice(0, 3).map(campaign => (
                  <div
                    key={campaign.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-surface-container 
                      hover:bg-surface-container-high transition-colors"
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-title-small text-on-surface font-medium truncate">
                        {campaign.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {campaign.acceptsMoney && (
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-label-small">
                            Monetaria
                          </span>
                        )}
                        {campaign.acceptsInKind && (
                          <span className="px-2 py-0.5 rounded bg-secondary/10 text-secondary text-label-small">
                            <Package className="w-3 h-3 inline mr-1" />
                            Especie
                          </span>
                        )}
                      </div>
                    </div>
                    {campaign.acceptsMoney && campaign.goalAmount && (
                      <div className="text-right">
                        <span className="text-title-small text-primary font-medium">
                          {Math.round((campaign.raisedAmount / campaign.goalAmount) * 100)}%
                        </span>
                        <p className="text-label-small text-on-surface-variant">recaudado</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Applications */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-title-large text-on-surface font-medium">
                  Postulaciones Pendientes
                </h2>
                <Link to="/admin/voluntarios" className="btn-text text-primary">
                  Ver todas
                </Link>
              </div>
              {applications.filter(a => a.status === 'pending').length > 0 ? (
                <div className="space-y-3">
                  {applications
                    .filter(a => a.status === 'pending')
                    .slice(0, 3)
                    .map(app => (
                      <div
                        key={app.id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-surface-container"
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-title-small text-on-surface font-medium truncate">
                            {app.volunteerName}
                          </h3>
                          <p className="text-body-small text-on-surface-variant truncate">
                            {app.convocationTitle}
                          </p>
                        </div>
                        <span className="badge-pending">
                          <Calendar className="w-3 h-3" />
                          {app.appliedAt}
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-on-surface-variant mx-auto mb-3" />
                  <p className="text-body-medium text-on-surface-variant">
                    No hay postulaciones pendientes
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Performance Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-title-large font-medium mb-2">
                  ¡Excelente trabajo este mes!
                </h3>
                <p className="text-body-medium text-white/90">
                  Las donaciones han aumentado un 25% comparado con el mes anterior.
                  Sigue impulsando las campañas activas.
                </p>
              </div>
              <Link
                to="/admin/donaciones"
                className="btn-filled bg-white text-primary hover:bg-white/90"
              >
                Ver Reportes
              </Link>
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

export default AdminDashboard;
