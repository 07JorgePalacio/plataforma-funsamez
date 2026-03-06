import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Heart, User, LogOut, Settings, LayoutDashboard, Briefcase, ClipboardList, ChevronDown, Megaphone, Users, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
    const { user, logout } = useApp();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar muenú al hacer click afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //  AppContext
    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'administrador';
    const isVolunteer = user?.role === 'voluntario';

    // Solo dejamos Campañas y Convocatorias (Sin Inicio por ahora)
    const publicLinks = [
        { path: '/campanas', label: 'Campañas' },
        { path: '/convocatorias', label: 'Convocatorias' },
    ];

    const getDashboardLink = () => {
        if (isAdmin) return '/admin/dashboard';
        if (isVolunteer) return '/voluntario';
        return '/login';
    };

    return (
        <>
        <header className="sticky top-0 z-50 glass border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/campanas" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary 
                          flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <Heart className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-title-medium text-on-surface font-bold tracking-tight">FUNSAMEZ</h1>
                            <p className="text-label-small text-on-surface-variant -mt-0.5">Fundación</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {publicLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-full text-label-large transition-all duration-200
                  ${location.pathname === link.path
                                        ? 'bg-primary/10 text-primary font-bold'
                                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3 relative">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                {/* Botón de Perfil / Dropdown Trigger */}
                                <div className="relative" ref={dropdownRef}>
                                    <button 
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high transition-all border border-outline-variant/30 active:scale-95"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-sm">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="hidden sm:block text-label-large font-bold text-on-surface pr-2 pl-1">
                                            {user?.name?.split(' ')[0] || 'Mi Cuenta'}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-300 mr-1 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Menú Desplegable */}
                                    <div className={`absolute right-0 mt-3 w-64 glass bg-surface/80 backdrop-blur-md rounded-2xl shadow-elevation-3 border border-outline-variant/30 overflow-hidden origin-top-right transition-all duration-200 ease-out z-[60] ${userMenuOpen ? 'opacity-100 scale-100 visible translate-y-0' : 'opacity-0 scale-95 invisible -translate-y-2'}`}>
                                        <div className="p-4 bg-surface-container-lowest/20 border-b border-outline-variant/30">
                                            <p className="text-label-medium text-on-surface font-bold truncate">{user?.name}</p>
                                            <p className="text-[11px] text-on-surface-variant uppercase tracking-wider font-medium">{user?.role}</p>
                                        </div>
                                        
                                        <div className="p-2">
                                            <Link to={getDashboardLink()} onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </Link>
                                            
                                            {isVolunteer && (
                                                <>
                                                    <Link to="/voluntario/perfil" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <User className="w-4 h-4" /> Mi Perfil
                                                    </Link>
                                                    <Link to="/voluntario/convocatorias" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <Briefcase className="w-4 h-4" /> Convocatorias
                                                    </Link>
                                                    <Link to="/voluntario/postulaciones" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <ClipboardList className="w-4 h-4" /> Mis Postulaciones
                                                    </Link>
                                                </>
                                            )}

                                            {isAdmin && (
                                                <>
                                                    <Link to="/admin/campanas" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <Megaphone className="w-4 h-4" /> Campañas
                                                    </Link>
                                                    <Link to="/admin/convocatorias" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <Briefcase className="w-4 h-4" /> Convocatorias
                                                    </Link>
                                                    <Link to="/admin/voluntarios" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <Users className="w-4 h-4" /> Voluntarios
                                                    </Link>
                                                    <Link to="/admin/donaciones" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <Heart className="w-4 h-4" /> Donaciones
                                                    </Link>
                                                    <Link to="/admin/editor-inicio" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-medium text-on-surface hover:bg-primary/10 hover:text-primary transition-colors">
                                                        <Home className="w-4 h-4" /> Editor de Inicio
                                                    </Link>
                                                </>
                                            )}
                                        </div>

                                        <div className="p-2 border-t border-outline-variant/30 bg-surface-container-lowest/50">
                                            <button 
                                                onClick={() => { logout(); setUserMenuOpen(false); }}
                                                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-body-medium text-error hover:bg-error/10 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" /> Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link 
                                    to={location.pathname === '/login' ? '/register' : '/login'} 
                                    className={`py-2 hidden sm:inline-flex transition-all ${
                                        location.pathname === '/login' || location.pathname === '/register'
                                        ? 'bg-primary/10 text-primary font-bold px-6 rounded-full border border-primary/20 shadow-inner' 
                                        : 'btn-outlined'
                                    }`}
                                >
                                    {location.pathname === '/login' ? 'Crear cuenta' : 'Iniciar Sesión'}
                                </Link>
                                <Link to="/campanas" className="btn-filled py-2 px-5 shadow-sm shadow-primary/30 flex items-center justify-center rounded-full min-w-[105px]">
                                    <Heart className="w-4 h-4 mr-2 shrink-0" />
                                    <span className="text-sm font-bold whitespace-nowrap">Donar</span>
                                </Link>
                            </div>
                        )}

                        </div>
                </div>
            </div>
        </header>

        {/* --- DOCK DE NAVEGACIÓN (MÓVIL PÚBLICO) --- */}
        <nav className="md:hidden fixed bottom-6 inset-x-4 glass bg-surface/80 backdrop-blur-md border border-outline-variant/30 z-40 flex items-center justify-evenly p-2 rounded-3xl shadow-elevation-4 overflow-hidden">
            <MobileNavItem 
                icon={<Megaphone size={22}/>} 
                text="Campañas" 
                active={location.pathname === '/campanas'} 
                onClick={() => navigate('/campanas')} 
            />
            <MobileNavItem 
                icon={<Briefcase size={22}/>} 
                text="Convocatorias" 
                active={location.pathname === '/convocatorias'} 
                onClick={() => navigate('/convocatorias')} 
            />
            
            {/* Separador */}
            <div className="w-px h-8 bg-outline-variant/30 mx-2"></div>

            {/* Botón Dinámico: Ingresar o Ir al Panel */}
                {isAuthenticated ? (
                    <MobileNavItem 
                        icon={<LayoutDashboard size={22}/>} 
                        text="Mi Panel" 
                        active={false} 
                        onClick={() => navigate(getDashboardLink())} 
                    />
                ) : (
                    <MobileNavItem 
                        icon={<User size={22}/>} 
                        text="Ingresar" 
                        active={location.pathname === '/login' || location.pathname === '/register'} 
                        onClick={() => navigate('/login')} 
                    />
                )}
            </nav>
        </>
    );
}

// Subcomponente NavItem (Móvil)
const MobileNavItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`shrink-0 flex flex-col items-center gap-1 p-2 min-w-[72px] transition-colors ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
    <div className={`p-1.5 rounded-full transition-all ${active ? 'bg-primary/15' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>{text}</span>
  </button>
);