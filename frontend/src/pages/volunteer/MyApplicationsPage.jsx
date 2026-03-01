import { useState, useMemo, useEffect, useRef } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
    Clock, CheckCircle2, XCircle, AlertCircle, Calendar, 
    Search, Filter, ChevronLeft, ChevronRight, Pause, MessageCircle 
} from 'lucide-react';

export default function MyApplicationsPage() {

    const { getApplicationsByVolunteer, convocations, loading } = useApp();
    const applications = getApplicationsByVolunteer();
    const location = useLocation();
    const cardRefs = useRef({}); 

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getStatusInfo = (estado, motivoRechazo = null) => {
        switch (estado) {
            case 'en_revision':
                return { label: 'En Revisión', bgClass: 'bg-warning', textClass: 'text-warning', bgLightClass: 'bg-warning/10', borderClass: 'border-warning/20', icon: Clock, description: 'Tu postulación está siendo revisada por nuestro equipo.' };
            case 'en_espera':
                return { label: 'En Espera', bgClass: 'bg-secondary', textClass: 'text-secondary', bgLightClass: 'bg-secondary/10', borderClass: 'border-secondary/20', icon: Pause, description: 'Tu postulación está en lista de espera. Te notificaremos si se liberan cupos.' };
            case 'aprobada':
                return { label: 'Aprobada', bgClass: 'bg-success', textClass: 'text-success', bgLightClass: 'bg-success/10', borderClass: 'border-success/20', icon: CheckCircle2, description: '¡Felicidades! Has sido aceptado. Revisa las instrucciones de contacto.' };
            case 'rechazada':
                return { label: 'No Seleccionado', bgClass: 'bg-error', textClass: 'text-error', bgLightClass: 'bg-error/10', borderClass: 'border-error/20', icon: XCircle, description: motivoRechazo ? `Motivo: ${motivoRechazo}` : 'En esta ocasión no fuiste seleccionado. ¡Sigue intentando!' };
            default:
                return { label: 'Desconocido', bgClass: 'bg-surface-variant', textClass: 'text-surface-variant', bgLightClass: 'bg-surface-variant/10', borderClass: 'border-surface-variant/20', icon: AlertCircle, description: '' };
        }
    };

    const filteredApplications = useMemo(() => {
        return applications.filter(app => {
            // Buscamos la convocatoria para poder buscar por su título
            const convocation = convocations.find(c => c.id === app.id_convocatoria);
            const title = convocation ? convocation.title.toLowerCase() : '';
            
            const matchesSearch = title.includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === '' || app.estado === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }, [applications, convocations, searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    useMemo(() => setCurrentPage(1), [searchTerm, statusFilter]);

    useEffect(() => {
        const highlightId = location.state?.highlightId;
        if (!loading && highlightId && cardRefs.current[highlightId]) {
            setTimeout(() => {
                const card = cardRefs.current[highlightId];
                
                // 1. Scroll suave hacia el centro de la pantalla
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // 2. Le añadimos un aura (borde) y la animación de parpadeo (pulse)
                card.classList.add('ring-4', 'ring-primary/50', 'animate-pulse');
                
                // 3. Se lo quitamos después de 3 segundos para que vuelva a la normalidad
                setTimeout(() => {
                    card.classList.remove('ring-4', 'ring-primary/50', 'animate-pulse');
                }, 3000);
                
                // 4. Limpiamos el historial para que no vuelva a saltar si el usuario recarga la página
                window.history.replaceState({}, document.title);
            }, 150);
        }
    }, [loading, location.state]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando tus postulaciones...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    Mis Postulaciones
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Haz seguimiento al estado de tus postulaciones a las diferentes convocatorias.
                </p>
            </div>

            {/* CASO 1: El voluntario NUNCA se ha postulado a nada */}
            {applications.length === 0 ? (
                <div className="card-elevated text-center py-12">
                    <Clock className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                    <h3 className="text-title-large text-on-surface mb-2">Aún no te has postulado a nada</h3>
                    <p className="text-body-medium text-on-surface-variant max-w-md mx-auto mb-6">
                        Explora las convocatorias abiertas y encuentra la oportunidad perfecta para ayudar.
                    </p>
                </div>
            ) : (
                <>
                    {/* BARRA DE BÚSQUEDA Y FILTROS */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-surface-container-lowest p-2 rounded-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar por título de convocatoria..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface"
                            />
                        </div>
                        
                        <div className="relative min-w-[200px]">
                            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none appearance-none bg-surface cursor-pointer"
                            >
                                <option value="">Todos los Estados</option>
                                <option value="en_revision">En Revisión</option>
                                <option value="en_espera">En Espera</option>
                                <option value="aprobada">Aprobadas</option>
                                <option value="rechazada">No Seleccionado</option>
                            </select>
                        </div>
                    </div>

                    {/* CASO 2: La búsqueda no arrojó resultados */}
                    {filteredApplications.length === 0 ? (
                        <div className="card-elevated text-center py-16">
                            <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                            <h3 className="text-title-large text-on-surface mb-2">No se encontraron postulaciones</h3>
                            <p className="text-body-medium text-on-surface-variant max-w-md mx-auto">
                                Intenta ajustar tus filtros de búsqueda para ver más resultados.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {paginatedApplications.map((app) => {
                                const convocation = convocations.find(c => c.id === app.id_convocatoria);
                                const statusInfo = getStatusInfo(app.estado, app.motivo_rechazo);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div 
                                        key={app.id} 
                                        ref={(el) => (cardRefs.current[app.id] = el)}
                                        className="card-elevated p-6 md:p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
                                    >
                                        {/* Barra lateral asegurada con Tailwind */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${statusInfo.bgClass}`}></div>
                                        
                                        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between pl-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${statusInfo.bgLightClass} ${statusInfo.textClass} ${statusInfo.borderClass}`}>
                                                        <StatusIcon className="w-4 h-4" />
                                                        {statusInfo.label}
                                                    </span>
                                                    <span className="text-body-small text-on-surface-variant flex items-center gap-1">
                                                        <Calendar className="w-3.5 h-3.5" /> 
                                                        {new Date(app.fecha_postulacion).toLocaleDateString('es-CO')}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-title-large font-bold text-on-surface mb-2">
                                                    {convocation ? convocation.title : 'Convocatoria no encontrada'}
                                                </h3>
                                                
                                                <div className="mt-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                                                    <p className={`text-body-medium font-bold flex items-center gap-2 mb-1 ${statusInfo.textClass}`}>
                                                        <AlertCircle className="w-4 h-4" /> 
                                                        Estado Actual:
                                                    </p>
                                                    <p className="text-body-medium text-on-surface-variant">
                                                        {statusInfo.description}
                                                    </p>
                                                </div>

                                                {/*  Renderizado Condicional del Botón de WhatsApp */}
                                                {app.estado === 'aprobada' && convocation?.link_whatsapp && (
                                                    <div className="mt-5 animate-fade-in">
                                                        <a 
                                                            href={convocation.link_whatsapp} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20b958] text-white font-bold rounded-xl shadow-md shadow-[#25D366]/30 transition-transform duration-200 hover:-translate-y-0.5"
                                                        >
                                                            <MessageCircle className="w-5 h-5" />
                                                            Unirse al Grupo de WhatsApp
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* CONTROLES DE PAGINACIÓN */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                                disabled={currentPage === 1} 
                                className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-primary" />
                            </button>
                            <span className="text-body-large text-on-surface-variant">
                                Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}
                            </span>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                                disabled={currentPage === totalPages} 
                                className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 text-primary" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}