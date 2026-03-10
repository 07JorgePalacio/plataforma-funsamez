import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
    Users, CheckCircle, XCircle, Clock, Mail,
    Briefcase, Search, Filter, ChevronDown, X, Pause, ChevronLeft, ChevronRight, Check, Info, RotateCcw,
    Phone, FileDigit, Star, Calendar, Trash2
} from 'lucide-react';
import Snackbar from '../../components/Snackbar';
import ConfirmDialog from '../../components/ConfirmDialog';

// --- MODAL DE RECHAZO ---
function RejectionModal({ application, onConfirm, onClose }) {
    const [reason, setReason] = useState('');
    const [includeReason, setIncludeReason] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(application.id, 'rechazada', includeReason ? reason : null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-md flex flex-col overflow-hidden animate-slide-up">
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30">
                    <h2 className="text-title-large text-on-surface font-bold">Rechazar Postulación</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors"><X className="w-5 h-5 text-on-surface-variant" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-surface-container-lowest">
                    <div className="p-4 rounded-xl bg-error/5 border border-error/20">
                        <p className="text-body-medium text-on-surface">
                            ¿Estás seguro de rechazar la postulación de <span className="font-bold">{application.volunteerName}</span> a <span className="font-bold">{application.convocationTitle}</span>?
                        </p>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={includeReason} onChange={(e) => setIncludeReason(e.target.checked)} className="w-5 h-5 rounded border-2 border-outline-variant text-primary focus:ring-primary focus:ring-offset-0" />
                        <span className="text-body-medium text-on-surface font-medium">Incluir motivo del rechazo</span>
                    </label>
                    {includeReason && (
                        <div className="animate-fade-in">
                            <label className="block text-label-large text-on-surface mb-2 font-bold">Motivo (se notificará al voluntario)</label>
                            <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="input-outlined resize-none bg-white focus:bg-white" rows={3} placeholder="Ej: No cumple con el perfil requerido..." />
                        </div>
                    )}
                    <div className="flex gap-3 pt-4 border-t border-outline-variant/30">
                        <button type="button" onClick={onClose} className="btn-tonal flex-1 font-bold">Cancelar</button>
                        <button type="submit" className="btn-filled bg-error flex-1 font-bold shadow-error/30 shadow-lg"><XCircle className="w-4 h-4 mr-2" /> Rechazar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- MODAL DE DETALLES DEL VOLUNTARIO ---
function VolunteerDetailsModal({ application, onClose }) {
    if (!application) return null;

    // LÓGICA DE MATCH DE HABILIDADES
    const volSkills = application.habilidades_usuario || [];
    const reqSkills = application.convocationSkills || [];
    
    // Filtramos las que coinciden (ignorando mayúsculas/minúsculas)
    const matchedSkills = volSkills.filter(skill => 
        reqSkills.some(req => req.toLowerCase() === skill.toLowerCase())
    );
    // Filtramos el resto
    const otherSkills = volSkills.filter(skill => 
        !reqSkills.some(req => req.toLowerCase() === skill.toLowerCase())
    );

    // LÓGICA DE MATCH DE DISPONIBILIDAD
    const volAvailability = application.disponibilidad_usuario || {};
    const convSchedule = application.convocationSchedule || {};
    const isUniqueEvent = convSchedule?.tipo === 'unico';
    
    const getDayMatchStatus = (dia) => {
        const volHasDay = !!volAvailability[dia];
        let convRequiresDay = false;

        if (isUniqueEvent && convSchedule.fecha) {
            // Calculamos el día de la semana de la fecha única (Ajustando zona horaria local)
            const dateObj = new Date(convSchedule.fecha + 'T00:00:00');
            const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            if (daysMap[dateObj.getDay()] === dia) convRequiresDay = true;
        } else if (convSchedule?.tipo === 'recurrente') {
            convRequiresDay = !!convSchedule[dia];
        }

        if (volHasDay && convRequiresDay) return 'match';
        if (volHasDay) return 'available';
        if (convRequiresDay) return 'required_missing';
        return 'none';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30">
                    <h2 className="text-title-large text-on-surface font-bold flex items-center gap-2">
                        <Info className="w-6 h-6 text-primary" /> Detalles del Voluntario
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors">
                        <X className="w-5 h-5 text-on-surface-variant" />
                    </button>
                </div>

                {/* Contenido scrolleable */}
                <div className="p-6 overflow-y-auto bg-surface-container-lowest space-y-6">
                    
                    {/* Tarjeta de Perfil Principal */}
                    <div className="flex items-center gap-4 p-4 bg-surface-container rounded-2xl border border-outline-variant/30">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shadow-sm border border-primary/20 shrink-0">
                            {application.volunteerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-headline-small font-bold text-on-surface">{application.volunteerName}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-on-surface-variant font-medium">
                                <Briefcase className="w-4 h-4" /> Postulado a: {application.convocationTitle}
                            </div>
                        </div>
                    </div>

                    {/* Cuadrícula de Información de Contacto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card-elevated p-4 flex items-start gap-3 shadow-sm border border-outline-variant/30">
                            <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            <div>
                                <p className="text-label-small text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">Correo Electrónico</p>
                                <p className="text-body-medium text-on-surface font-medium break-all">{application.correo_usuario || 'No registrado'}</p>
                            </div>
                        </div>
                        <div className="card-elevated p-4 flex items-start gap-3 shadow-sm border border-outline-variant/30">
                            <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            <div>
                                <p className="text-label-small text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">Teléfono</p>
                                <p className="text-body-medium text-on-surface font-medium">{application.telefono_usuario || 'No registrado'}</p>
                            </div>
                        </div>
                        <div className="card-elevated p-4 flex items-start gap-3 shadow-sm border border-outline-variant/30">
                            <FileDigit className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            <div>
                                <p className="text-label-small text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">Documento de Identidad</p>
                                <p className="text-body-medium text-on-surface font-medium">{application.documento_usuario || 'No registrado'}</p>
                            </div>
                        </div>
                        <div className="card-elevated p-4 flex items-start gap-3 shadow-sm border border-outline-variant/30">
                            <Calendar className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            <div>
                                <p className="text-label-small text-on-surface-variant font-bold uppercase tracking-wider mb-0.5">Fecha de Postulación</p>
                                <p className="text-body-medium text-on-surface font-medium">{new Date(application.fecha_postulacion).toLocaleDateString('es-CO')} - {new Date(application.fecha_postulacion).toLocaleTimeString('es-CO', {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                    </div>

                    {/* 🟢 MATRIZ DE DISPONIBILIDAD DE TIEMPO */}
                    <div>
                        <h4 className="text-title-medium font-bold text-on-surface mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" /> Disponibilidad de Tiempo
                        </h4>
                        <div className="bg-surface-container rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-px bg-outline-variant/30">
                                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => {
                                    const status = getDayMatchStatus(dia);
                                    const volTime = volAvailability[dia];
                                    
                                    let bgClass = "bg-surface";
                                    let textClass = "text-on-surface-variant";
                                    let badge = null;

                                    if (status === 'match') {
                                        bgClass = "bg-success/15 border-b-4 border-success";
                                        textClass = "text-success-dark font-bold";
                                        badge = <span className="text-[9px] bg-success text-white px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5 w-full block shadow-sm text-center">Match Ideal</span>;
                                    } else if (status === 'available') {
                                        bgClass = "bg-primary/5 border-b-2 border-primary/20";
                                        textClass = "text-primary font-bold";
                                    } else if (status === 'required_missing') {
                                        bgClass = "bg-error/5 border-b-2 border-error/20";
                                        textClass = "text-error opacity-60";
                                        badge = <span className="text-[9px] text-error font-bold mt-1.5 w-full block leading-tight text-center">Requerido, falta</span>;
                                    }

                                    return (
                                        <div key={dia} className={`p-3 flex flex-col items-center justify-start text-center h-full ${bgClass} transition-colors`}>
                                            <span className={`text-sm ${textClass}`}>{dia.substring(0, 3)}</span>
                                            {volTime && volTime.start && volTime.end ? (
                                                <span className="text-xs font-bold text-on-surface mt-1">{volTime.start} - {volTime.end}</span>
                                            ) : volTime === true || volTime === 'Disponible' ? (
                                                <span className="text-xs font-bold text-on-surface mt-1">Disponible</span>
                                            ) : (
                                                <span className="text-xs text-on-surface-variant opacity-40 mt-1">-</span>
                                            )}
                                            {badge}
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="p-4 bg-surface-container-lowest flex items-start gap-3">
                                <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-on-surface-variant">
                                        {isUniqueEvent && convSchedule.fecha ? (
                                            <>El evento es de <strong>fecha única</strong> el <span className="font-bold text-on-surface capitalize">{new Date(convSchedule.fecha + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span> de {convSchedule.horaInicio} a {convSchedule.horaFin}.</>
                                        ) : (
                                            <>Las casillas <span className="text-success-dark font-bold">Verdes</span> indican que la disponibilidad del voluntario coincide con los días que exige la convocatoria.</>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Habilidades (Con lógica de Match) */}   
                    <div>
                        <h4 className="text-title-medium font-bold text-on-surface mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary" /> Perfil de Habilidades
                        </h4>
                        
                        {volSkills.length === 0 ? (
                            <p className="text-body-medium text-on-surface-variant italic bg-surface-container p-4 rounded-xl border border-outline-variant/30">
                                El voluntario no ha declarado habilidades en su perfil.
                            </p>
                        ) : (
                            <div className="space-y-5">
                                {/* 🟢 1. Habilidades Destacadas (Match) */}
                                {matchedSkills.length > 0 && (
                                    <div className="bg-success/5 p-4 rounded-2xl border border-success/20">
                                        <p className="text-label-small font-bold text-success-dark uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                            <CheckCircle className="w-4 h-4" /> Coinciden con lo requerido
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {matchedSkills.map((habilidad, index) => (
                                                <span key={index} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-success text-white shadow-md shadow-success/20 flex items-center gap-1.5">
                                                    <Star className="w-3.5 h-3.5" fill="currentColor" /> {habilidad}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 2. Otras Habilidades */}
                                {otherSkills.length > 0 && (
                                    <div className="px-2">
                                        <p className="text-label-small font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                                            {matchedSkills.length > 0 ? 'Otras habilidades del voluntario' : 'Habilidades declaradas'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {otherSkills.map((habilidad, index) => (
                                                <span key={index} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-container-high text-on-surface border border-outline-variant/50">
                                                    {habilidad}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Observaciones de la Postulación */}
                    {application.observaciones && (
                        <div>
                            <h4 className="text-title-medium font-bold text-on-surface mb-2">Mensaje del Voluntario</h4>
                            <div className="p-4 bg-surface-container-high rounded-xl border border-outline-variant/50 text-body-medium text-on-surface">
                                "{application.observaciones}"
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer del Modal */}
                <div className="p-4 border-t border-outline-variant/30 bg-surface flex justify-end">
                    <button onClick={onClose} className="btn-tonal px-6 py-2.5 font-bold">
                        Cerrar Detalles
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VolunteersPage() {
    // Traemos adminApplications y convocations del Contexto Real
    const { adminApplications = [], convocations = [], updateApplicationStatus, deleteApplication, loading } = useApp();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState('pendientes');
    const [highlightedCard, setHighlightedCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Modales y SnackBar
    const [rejectionModal, setRejectionModal] = useState(null);
    const [detailsModal, setDetailsModal] = useState(null);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });
    const showMessage = (message, type = 'success') => setSnackbar({ show: true, message, type });

    // ConfirmDialog para Eliminar
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const showConfirm = (title, message, onConfirm, type = 'danger') => setConfirmDialog({ isOpen: true, title, message, onConfirm, type });
    const closeConfirm = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }));

    const handleDelete = (id) => {
        showConfirm(
            'Eliminar Postulación', 
            '¿Estás seguro de que deseas eliminar permanentemente esta postulación del historial? Esta acción no se puede deshacer.', 
            async () => {
                closeConfirm();
                try { 
                    await deleteApplication(id); 
                    showMessage("Postulación eliminada del historial.", "error");
                } catch (error) { 
                    showMessage("Error al eliminar la postulación.", "error"); 
                }
            }
        );
    };

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter, activeTab]);

    // Motor de Smart Scroll & Highlight
    useEffect(() => {
        const highlightId = location.state?.highlightId;
        if (highlightId && !loading && adminApplications.length > 0) {
            setTimeout(() => {
                const element = document.getElementById(`admin-volunteer-${highlightId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setHighlightedCard(Number(highlightId));
                    
                    // Apagamos el resaltado después de 3 segundos y limpiamos la mochila
                    setTimeout(() => {
                        setHighlightedCard(null);
                        window.history.replaceState({}, document.title);
                    }, 3000);
                }
            }, 150);
        }
    }, [location.state?.highlightId, loading, adminApplications.length]);

    const mappedApplications = useMemo(() => {
        return adminApplications.map(app => {
            const convocation = convocations.find(c => c.id === app.id_convocatoria);
            
            // Extraemos y normalizamos las habilidades requeridas de la convocatoria
            let reqSkills = [];
            if (convocation) {
                const rawSkills = convocation.habilidades_requeridas || convocation.skills;
                if (typeof rawSkills === 'string') {
                    reqSkills = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
                } else if (Array.isArray(rawSkills)) {
                    reqSkills = rawSkills;
                }
            }

            return {
                ...app,
                volunteerName: app.nombre_usuario || `Voluntario #${app.id_usuario}`, 
                convocationTitle: convocation ? convocation.title : 'Convocatoria Eliminada/Desconocida',
                convocationSkills: reqSkills, // Guardamos las requeridas para hacer el match
                convocationSchedule: convocation ? convocation.horario : null 
            };
        });
    }, [adminApplications, convocations]);

    // Lógica de Pestañas
    const rawList = mappedApplications.filter(app => {
        if (activeTab === 'pendientes') return app.estado === 'en_revision' || app.estado === 'en_espera';
        return app.estado === 'aprobada' || app.estado === 'rechazada'; // historial
    });

    const filteredList = rawList.filter(app => {
        const matchesSearch = app.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              app.convocationTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || app.estado === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    const paginatedList = filteredList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleStatusChange = async (appId, newStatus, reason = null) => {
        try {
            await updateApplicationStatus(appId, newStatus, reason);
            if (newStatus === 'aprobada') showMessage("¡Voluntario aprobado con éxito!", "success");
            else if (newStatus === 'en_espera') showMessage("Postulación puesta en espera.", "warning");
            else if (newStatus === 'en_revision') showMessage("Postulación devuelta a pendientes.", "info");
            else showMessage("Postulación rechazada.", "error");
        } catch (error) {
            showMessage("Ocurrió un error al cambiar el estado.", "error");
        }
    };

    const getStatusStyles = (estado) => {
        switch (estado) {
            case 'en_revision': return { color: 'warning', label: 'En Revisión', icon: Clock };
            case 'en_espera': return { color: 'secondary', label: 'En Espera', icon: Pause };
            case 'aprobada': return { color: 'success', label: 'Aprobada', icon: CheckCircle };
            case 'rechazada': return { color: 'error', label: 'Rechazada', icon: XCircle };
            default: return { color: 'surface-variant', label: 'Desconocido', icon: Clock };
        }
    };

    // 🟢 VALIDACIÓN DE CARGA AL FINAL PARA EVITAR PANTALLA BLANCA
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Sincronizando postulaciones...</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in pb-12">
            
            <div className="mb-6 md:mb-8 mt-2 md:mt-0">
                <h1 className="text-headline-small md:text-headline-medium text-on-surface font-bold mb-1 md:mb-2">
                    Gestión de Postulaciones
                </h1>
                <p className="text-body-medium md:text-body-large text-on-surface-variant">
                    Revisa, aprueba o rechaza a los voluntarios.
                </p>
            </div>

            {/* PESTAÑAS (TABS) */}
            <div className="flex bg-surface-container rounded-full p-1 w-fit mb-6 shadow-sm">
                <button onClick={() => setActiveTab('pendientes')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'pendientes' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                    Pendientes
                </button>
                <button onClick={() => setActiveTab('historial')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === 'historial' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                    Historial
                </button>
            </div>

            {/* BARRA DE BÚSQUEDA Y FILTROS */}
            <div className="sticky top-0 z-10 bg-surface/95 pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent border-b border-transparent sm:border-none mb-2">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <input type="text" placeholder="Buscar por nombre o convocatoria..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        <div className="relative min-w-[180px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full">
                                <option value="all">Todos los estados</option>
                                {activeTab === 'pendientes' ? (
                                    <>
                                        <option value="en_revision">En Revisión</option>
                                        <option value="en_espera">En Espera</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="aprobada">Aprobadas</option>
                                        <option value="rechazada">Rechazadas</option>
                                    </>
                                )}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* LISTA DE POSTULACIONES */}
            <div className="space-y-4 pt-2 min-h-[400px]">
                {paginatedList.length === 0 ? (
                    <div className="card-elevated text-center py-16 animate-slide-up border-2 border-dashed border-outline-variant/50 bg-transparent">
                        <Users className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                        <h3 className="text-title-large text-on-surface mb-2">No hay postulaciones aquí</h3>
                        <p className="text-body-medium text-on-surface-variant max-w-md mx-auto">
                            {activeTab === 'pendientes' ? 'Todas las postulaciones han sido procesadas o aún no hay postulantes.' : 'Aún no has procesado ninguna postulación.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedList.map((app) => {
                            const styles = getStatusStyles(app.estado);
                            const Icon = styles.icon;

                            return (
                                <div 
                                    key={app.id} 
                                    id={`admin-volunteer-${app.id}`}
                                    className={`card-elevated flex flex-col h-full animate-fade-in group transition-all duration-500 relative ${activeTab === 'historial' ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' : ''} ${highlightedCard === app.id ? 'border-secondary ring-4 ring-secondary/40 bg-secondary/5 scale-[1.02] shadow-xl z-10' : 'hover:-translate-y-1'}`}
                                >
                                    {/* Barra superior de color indicadora de estado */}
                                    <div className={`h-1.5 w-full bg-${styles.color}`}></div>
                                    
                                    <div className="p-5 flex-1 flex flex-col">
                                        {/* Cabecera (Estado y Fecha) */}
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-${styles.color}/10 text-${styles.color} border border-${styles.color}/20 flex items-center gap-1`}>
                                                <Icon className="w-3 h-3" /> {styles.label}
                                            </span>
                                            <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wide">
                                                {new Date(app.fecha_postulacion).toLocaleDateString('es-CO')}
                                            </span>
                                        </div>
                                        
                                        {/* Avatar y Nombre */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-on-surface-variant font-bold text-sm shadow-sm border border-outline-variant/50">
                                                {app.volunteerName.charAt(0).toUpperCase()}
                                            </div>
                                            <h3 className="text-title-medium font-bold text-on-surface line-clamp-1" title={app.volunteerName}>
                                                {app.volunteerName}
                                            </h3>
                                        </div>

                                        {/* Convocatoria Target */}
                                        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 w-full">
                                            <Briefcase className="w-4 h-4 text-primary shrink-0" />
                                            <span className="text-xs font-bold text-on-surface truncate" title={app.convocationTitle}>{app.convocationTitle}</span>
                                        </div>

                                        {/* Observaciones / Motivos */}
                                        <div className="flex-1 flex flex-col gap-2">
                                            {app.observaciones && (
                                                <p className="text-xs text-on-surface-variant italic line-clamp-2">
                                                    "{app.observaciones}"
                                                </p>
                                            )}
                                            {app.estado === 'rechazada' && app.motivo_rechazo && (
                                                <p className="text-xs text-error font-medium flex items-start gap-1 line-clamp-2 mt-auto">
                                                    <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5"/> 
                                                    Motivo: {app.motivo_rechazo}
                                                </p>
                                            )}
                                        </div>

                                        {/* Botones Inferiores (Idénticos a AdminConvocationsPage) */}
                                        <div className="flex gap-2 mt-auto pt-4 border-t border-outline-variant/20">
                                            <button onClick={() => setDetailsModal(app)} className="btn-tonal py-2 flex-1 text-xs justify-center font-bold">
                                                <Info size={16} className="mr-1"/> Detalles
                                            </button>
                                            
                                            {activeTab === 'pendientes' ? (
                                                <>
                                                    <button onClick={() => handleStatusChange(app.id, 'aprobada')} className="btn-outlined py-2 px-2 text-success border-success hover:bg-success/10" title="Aprobar Postulación"><Check size={16}/></button>
                                                    {app.estado !== 'en_espera' && (
                                                        <button onClick={() => handleStatusChange(app.id, 'en_espera')} className="btn-outlined py-2 px-2 text-secondary border-secondary hover:bg-secondary/10" title="Poner en Espera"><Pause size={16}/></button>
                                                    )}
                                                    <button onClick={() => setRejectionModal(app)} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10" title="Rechazar"><X size={16}/></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleStatusChange(app.id, 'en_revision')} className="btn-outlined py-2 px-2 text-warning border-warning hover:bg-warning/10" title="Devolver a Pendientes">
                                                        <RotateCcw size={16}/>
                                                    </button>
                                                    <button onClick={() => handleDelete(app.id)} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10" title="Eliminar del Historial">
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-outline-variant/30">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 transition-colors">
                        <ChevronLeft className="w-6 h-6 text-primary" />
                    </button>
                    <span className="text-sm font-medium text-on-surface-variant">
                        Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}
                    </span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 transition-colors">
                        <ChevronRight className="w-6 h-6 text-primary" />
                    </button>
                </div>
            )}

            {/* MODAL DE RECHAZO */}
            {rejectionModal && (
                <RejectionModal application={rejectionModal} onConfirm={handleStatusChange} onClose={() => setRejectionModal(null)} />
            )}

            {/* MODAL DE DETALLES */}
            {detailsModal && (
                <VolunteerDetailsModal application={detailsModal} onClose={() => setDetailsModal(null)} />
            )}

            <Snackbar show={snackbar.show} message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ ...snackbar, show: false })} />
            
            <ConfirmDialog 
                isOpen={confirmDialog.isOpen} 
                title={confirmDialog.title} 
                message={confirmDialog.message} 
                type={confirmDialog.type} 
                onConfirm={confirmDialog.onConfirm} 
                onCancel={closeConfirm} 
            />
        </div>
    );
}