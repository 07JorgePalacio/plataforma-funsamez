import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, Heart, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Header() {

    const { user, logout } = useApp();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to={getDashboardLink()}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full 
                           bg-secondary-container text-secondary-on-container text-label-large font-bold
                           hover:bg-secondary/20 transition-all"
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Mi Panel</span>
                                </Link>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="hidden sm:block text-body-medium font-bold text-on-surface">
                                        {user?.name?.split(' ')[0] || 'Usuario'}
                                    </span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-full text-on-surface-variant hover:bg-error-container 
                           hover:text-error transition-all"
                                    title="Cerrar sesión"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="btn-outlined py-2 hidden sm:inline-flex">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/campanas" className="btn-filled py-2 shadow-sm shadow-primary/30">
                                    <Heart className="w-4 h-4 mr-2" />
                                    <span className="hidden sm:inline">Donar</span>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-surface-container transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-outline-variant/30 animate-fade-in">
                        <nav className="flex flex-col gap-1">
                            {publicLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-xl text-label-large font-bold transition-all
                    ${location.pathname === link.path
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-on-surface-variant hover:bg-surface-container'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {isAuthenticated && (
                                <Link
                                    to={getDashboardLink()}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 mt-2 rounded-xl text-label-large text-secondary-on-container font-bold 
                           bg-secondary-container/50 hover:bg-secondary-container"
                                >
                                    Ir a Mi Panel
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}