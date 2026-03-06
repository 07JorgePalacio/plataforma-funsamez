import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, User, Briefcase, FileText, Heart, LogOut, Bell, X, Trash2, Globe } from 'lucide-react';

// ---  MODAL DE NOTIFICACIONES ---
function NotificationsModal({ isOpen, onClose, notifications, onNotificationClick, onDeleteClick, onDeleteAllClick }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center md:justify-end md:pr-6 md:pt-6 isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/40 transition-opacity animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl md:rounded-2xl shadow-elevation-5 w-[95vw] md:w-[400px] max-h-[85vh] md:max-h-[80vh] flex flex-col overflow-hidden animate-slide-up md:animate-slide-left mt-20 md:mt-0">
                
                {/* Header del Panel */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        <h2 className="text-title-large font-bold text-on-surface">Notificaciones</h2>
                    </div>
                    <div className="flex items-center gap-1">
                        {notifications.length > 0 && (
                            <button 
                                onClick={onDeleteAllClick} 
                                className="text-xs font-bold text-error hover:bg-error/10 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                Limpiar todas
                            </button>
                        )}
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
                            <X className="w-5 h-5 text-on-surface-variant" />
                        </button>
                    </div>
                </div>

                {/* Lista de Notificaciones */}
                <div className="overflow-y-auto p-3 bg-surface-container-lowest flex-1">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-on-surface-variant flex flex-col items-center">
                            <Bell className="w-12 h-12 mb-3 opacity-20" />
                            <p>No tienes notificaciones nuevas.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {notifications.map(notif => {
                                // Mapeo de colores M3
                                const typeStyles = {
                                    success: 'bg-success/10 text-success border-success/20',
                                    warning: 'bg-warning/10 text-warning border-warning/20',
                                    error: 'bg-error/10 text-error border-error/20',
                                    info: 'bg-primary/10 text-primary border-primary/20'
                                };
                                const style = typeStyles[notif.tipo] || typeStyles.info;

                                return (
                                    <div 
                                        key={notif.id} 
                                        onClick={() => onNotificationClick(notif)}
                                        className={`p-4 rounded-xl border transition-all cursor-pointer group relative ${!notif.leida ? 'bg-surface-container-highest border-outline-variant/50 shadow-sm hover:scale-[1.01]' : 'bg-surface border-outline-variant/30 opacity-60 hover:opacity-100'}`}
                                    >
                                        {/* items-stretch obliga a ambas columnas a tener la misma altura */}
                                        <div className="flex items-stretch gap-3">
                                            
                                            {/* Columna Izquierda (Texto y Fecha) */}
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {!notif.leida && <span className="w-2.5 h-2.5 rounded-full bg-error shrink-0 animate-pulse"></span>}
                                                        <h4 className={`text-label-large font-bold truncate ${notif.leida ? 'text-on-surface-variant' : 'text-on-surface'}`}>{notif.titulo}</h4>
                                                    </div>
                                                    <p className="text-body-medium text-on-surface-variant mb-1.5 leading-tight">{notif.mensaje}</p>
                                                </div>
                                                {/* mt-auto empuja la fecha siempre al fondo para alinearse con el basurero */}
                                                <div className="mt-auto pt-1">
                                                    <span className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-wider">
                                                        {new Date(notif.fecha_creacion).toLocaleString('es-CO')}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Columna Derecha (Icono y Basurero) */}
                                            <div className="flex flex-col items-center justify-between shrink-0">
                                                <div className={`p-2 rounded-full border ${style}`}>
                                                    <Bell className="w-4 h-4" />
                                                </div>
                                                
                                                {/* Basurero anclado al fondo derecho */}
                                                <button 
                                                    onClickCapture={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        onDeleteClick(notif.id);
                                                    }} 
                                                    className="p-1.5 text-on-surface-variant/40 hover:text-error hover:bg-error/10 rounded-md transition-all duration-200 active:scale-90"
                                                    title="Eliminar notificación"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function VolunteerLayout() {
  const { user, logout, notifications = [], markNotificationAsRead, deleteNotification, deleteAllNotifications, unreadNotificationsCount = 0 } = useApp(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

 //  Handler para Clic en Notificación (Navega y Marca como Leída)
  const handleNotificationClick = (notif) => {
    if (!notif.leida) {
        markNotificationAsRead(notif.id);
    }
    setIsNotificationsOpen(false); // Cierra el modal
    navigate('/voluntario/postulaciones', { state: { highlightId: notif.referencia_id } });
  };

  // Handler para Eliminar Definitivamente individual
  const handleDeleteNotification = async (id) => {
    try {
        await deleteNotification(id); 
    } catch (error) {
        console.error("No se pudo eliminar la notificación:", error);
    }
  };

  // Handler para Vaciar la bandeja
  const handleDeleteAllNotifications = async () => {
    try {
        await deleteAllNotifications(); 
    } catch (error) {
        console.error("No se pudieron eliminar las notificaciones:", error);
    }
  };

  // Obtenemos el nombre del usuario desde el contexto
  const userName = user?.name || 'Voluntario';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Función infalible para saber en qué ruta estamos
  const isActive = (path) => location.pathname === path || location.pathname === `${path}/`;

  return (
    <div className="flex min-h-screen bg-surface pb-32 md:pb-0">
      
      {/* --- SIDEBAR (PC) --- */}
      <aside className="w-[300px] bg-white border-r border-outline-variant hidden md:flex flex-col fixed h-full z-10 shadow-sm">
        {/* Logo Section */}
        <div className="px-6 py-6 flex items-center gap-4 border-b border-outline-variant">
          <div className="bg-primary p-2.5 rounded-xl shrink-0 shadow-sm">
            <Heart className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-on-surface text-base truncate tracking-tight">FUNSAMEZ</h2>
            <p className="text-xs text-on-surface-variant truncate font-medium">Portal Voluntario</p>
          </div>
        </div>

        {/* User Card (Estilo Admin) */}
        <div className="mx-4 my-6 p-4 bg-secondary-container rounded-2xl flex items-center gap-4 shadow-sm border border-secondary/10 relative">
          <div className="w-12 h-12 shrink-0 bg-white text-secondary rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1 pr-6">
            <p className="text-base font-bold text-on-container truncate leading-tight">{userName}</p>
            <p className="text-sm text-secondary font-medium truncate opacity-90">Voluntario Activo</p>
          </div>
          
          {/* Botón Campanita PC */}
          <button onClick={() => setIsNotificationsOpen(true)} className="absolute -top-3 -right-2 p-3 bg-white rounded-full shadow-elevation-2 border border-outline-variant/50 hover:bg-surface-container transition-colors focus:ring-4 focus:ring-primary/20">
            <Bell size={20} className="text-on-surface-variant" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-error rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Navigation Menu (Usando botones para navegación forzada) */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <div className="pb-2 mb-2 border-b border-outline-variant/30">
            <NavItem icon={<Globe size={22}/>} text="Explorar Sitio Web" active={false} onClick={() => navigate('/campanas')} />
          </div>
          <NavItem icon={<LayoutDashboard size={22}/>} text="Inicio" active={isActive('/voluntario')} onClick={() => navigate('/voluntario')} />
          <NavItem icon={<User size={22}/>} text="Mi Perfil" active={isActive('/voluntario/perfil')} onClick={() => navigate('/voluntario/perfil')} />
          <NavItem icon={<Briefcase size={22}/>} text="Convocatorias" active={isActive('/voluntario/convocatorias')} onClick={() => navigate('/voluntario/convocatorias')} />
          <NavItem icon={<FileText size={22}/>} text="Mis Postulaciones" active={isActive('/voluntario/postulaciones')} onClick={() => navigate('/voluntario/postulaciones')} />
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-outline-variant mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-4 text-on-surface-variant hover:text-error transition-colors w-full px-4 py-3.5 rounded-xl hover:bg-error-container/30 group">
            <LogOut size={22} className="group-hover:stroke-error" />
            <span className="text-base font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* BOTÓN CAMPANITA FLOTANTE (MÓVIL) */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <button onClick={() => setIsNotificationsOpen(true)} className="p-3.5 bg-surface/90 backdrop-blur-md rounded-full shadow-elevation-3 border border-outline-variant/50 relative hover:scale-105 transition-transform active:scale-95">
          <Bell size={24} className="text-on-surface-variant" />
          {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-error rounded-full border-2 border-surface animate-pulse"></span>
          )}
        </button>
      </div>

      {/* --- DOCK DE NAVEGACIÓN (MÓVIL) --- */}
      <nav className="md:hidden fixed bottom-6 inset-x-4 bg-surface/80 backdrop-blur-xl border border-white/20 z-40 flex items-center justify-around p-2 rounded-3xl shadow-elevation-4">
        <MobileNavItem icon={<LayoutDashboard size={22}/>} text="Inicio" active={isActive('/voluntario')} onClick={() => navigate('/voluntario')} />
        <MobileNavItem icon={<User size={22}/>} text="Perfil" active={isActive('/voluntario/perfil')} onClick={() => navigate('/voluntario/perfil')} />
        <MobileNavItem icon={<Briefcase size={22}/>} text="Convos" active={isActive('/voluntario/convocatorias')} onClick={() => navigate('/voluntario/convocatorias')} />
        <MobileNavItem icon={<FileText size={22}/>} text="Mis Post." active={isActive('/voluntario/postulaciones')} onClick={() => navigate('/voluntario/postulaciones')} />
        <MobileNavItem icon={<Globe size={22}/>} text="Web" active={false} onClick={() => navigate('/campanas')} />
        
        {/* Botón Salir pequeño */}
        <button onClick={handleLogout} className="flex flex-col items-center gap-1 p-2 text-on-surface-variant hover:text-error transition-colors opacity-70 hover:opacity-100">
          <LogOut size={22} />
        </button>
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-4 pt-20 md:pt-6 md:p-6 md:ml-[300px] w-full max-w-[100vw] overflow-x-hidden">
        {/* Aquí se inyectan dinámicamente las páginas (Dashboard, Perfil, etc) */}
        <Outlet />
      </main>

      {/* RENDERIZADO DEL MODAL */}
      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
        notifications={notifications} 
        onNotificationClick={handleNotificationClick} 
        onDeleteClick={handleDeleteNotification}
        onDeleteAllClick={handleDeleteAllNotifications}
      />
    </div>
  );
}

// Subcomponente NavItem (PC) - IDÉNTICO AL ADMIN
const NavItem = ({ icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all duration-200 ${active ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'}`}
  >
    <span className="shrink-0">{icon}</span>
    <span className="text-base truncate">{text}</span>
  </button>
);

// Subcomponente NavItem (Móvil) - IDÉNTICO AL ADMIN
const MobileNavItem = ({ icon, text, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
    <div className={`p-1.5 rounded-full transition-all ${active ? 'bg-primary/15' : 'bg-transparent'}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>{text}</span>
  </button>
);