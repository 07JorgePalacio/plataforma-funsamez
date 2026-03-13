import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
    MapPin, Users, CheckCircle, ArrowRight, X, Search, Filter,
    ChevronLeft, ChevronRight, Gift, Target, BookOpen,
    Laptop, Home, Clock3, CalendarCheck, Info, AlertTriangle, Activity, Briefcase, Star
} from 'lucide-react';
import Snackbar from '../../components/Snackbar';

const CATEGORIAS_INTERES = ["Salud", "Capacitación / Cursos", "Estética y Belleza", "Educación Infantil", "Medio Ambiente", "Adulto Mayor", "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial", "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal"];
const MODALIDADES = ["Presencial", "Virtual", "Híbrido"];
const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// --- HELPERS ARQUITECTÓNICOS ---
const formatDateFriendly = (isoString) => {
    if (!isoString) return 'Por definir';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return isoString.split('T')[0];
    }
};

const formatTime12h = (time24h) => {
    if (!time24h || time24h === '--:--') return '--:--';
    try {
        const [hoursStr, minutes] = time24h.split(':');
        let hours = parseInt(hoursStr, 10);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        const strHours = hours < 10 ? '0' + hours : hours;
        return `${strHours}:${minutes} ${ampm}`;
    } catch (e) {
        return time24h;
    }
};

const mapBackendToForm = (convocation) => {
    if (!convocation) return null;
    let skillsArray = [];
    if (convocation.habilidades_requeridas) {
        skillsArray = typeof convocation.habilidades_requeridas === 'string' 
            ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean) 
            : convocation.habilidades_requeridas;
    }
    const horarioData = convocation.horario || {};
    let tipoHorario = 'unico', fechaEvento = '', horaInicio = '', horaFin = '', horarioMatrix = {};
    
    if (horarioData.tipo === 'unico') {
        tipoHorario = 'unico'; 
        fechaEvento = horarioData.fecha || ''; 
        horaInicio = horarioData.horaInicio || ''; 
        horaFin = horarioData.horaFin || '';
    } else if (horarioData.tipo === 'recurrente' || Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
        tipoHorario = 'recurrente';
        DIAS_SEMANA.forEach(dia => { if (horarioData[dia]) horarioMatrix[dia] = horarioData[dia]; });
    }
    return {
        ...convocation, 
        id: convocation.id, 
        title: convocation.title || convocation.titulo || '', 
        description: convocation.description || convocation.descripcion || '', 
        location: convocation.ubicacion || '',
        link_google_maps: convocation.link_google_maps || '',
        whatsappGroupLink: convocation.link_whatsapp || '', 
        modalidad: convocation.modalidad ? convocation.modalidad.toLowerCase() : 'presencial', 
        spots: convocation.cupos_disponibles || 1,
        cupos_ocupados: convocation.cupos_ocupados || 0,
        startDate: tipoHorario === 'recurrente' && convocation.fecha_inicio ? convocation.fecha_inicio.split('T')[0] : '',
        endDate: tipoHorario === 'recurrente' && convocation.fecha_fin ? convocation.fecha_fin.split('T')[0] : '',
        categorias: Array.isArray(convocation.categorias) ? convocation.categorias : (convocation.categoria ? [convocation.categoria] : []), 
        skills: skillsArray, 
        beneficios: Array.isArray(convocation.beneficios) ? convocation.beneficios : (typeof convocation.beneficios === 'string' ? convocation.beneficios.split(',') : []), 
        tipoHorario, fechaEvento, horaInicio, horaFin, horario: horarioMatrix
    };
};

// --- LÓGICA DE PRESENTACIÓN: ALGORITMO DE MATCH SCORE ---
const calculateMatchScore = (parsedConv, user) => {
    if (!user) return 0;
    const habUser = user.habilidades || [];
    const dispUser = user.disponibilidad || {};
    const habReq = parsedConv.skills || [];
    const horarioReq = parsedConv.horario || {};

    let habScore = 50; // Puntaje base si no hay requisitos
    if (habReq.length > 0) {
        const coincidencias = habReq.filter(req => 
            habUser.some(hu => hu.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(hu.toLowerCase()))
        );
        habScore = (coincidencias.length / habReq.length) * 50;
    }

    let dispScore = 50; // Puntaje base si no hay horario estricto
    if (parsedConv.tipoHorario === 'recurrente' && Object.keys(horarioReq).length > 0) {
        dispScore = 0;
        for (const dia of Object.keys(horarioReq)) {
            if (dispUser[dia] && dispUser[dia].length > 0) {
                dispScore = 50;
                break;
            }
        }
    } else if (parsedConv.tipoHorario === 'unico' && parsedConv.fechaEvento) {
        dispScore = 0;
        const dateObj = new Date(parsedConv.fechaEvento + 'T00:00:00'); 
        const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const dayOfWeek = daysMap[dateObj.getDay()];
        if (dispUser[dayOfWeek] && dispUser[dayOfWeek].length > 0) {
            dispScore = 50;
        }
    }
    return habScore + dispScore;
};

export default function ConvocationsPage() {
    const { applyToConvocation, hasApplied, getPublishedConvocations, loading, user } = useApp();
    const publishedConvocations = getPublishedConvocations();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [modalityFilter, setModalityFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [selectedConvocation, setSelectedConvocation] = useState(null); 
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false); 
    const [observaciones, setObservaciones] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });

    const filteredConvocations = useMemo(() => {
        // 1. Mapear y calcular el score de compatibilidad
        const processed = publishedConvocations.map(c => {
            const parsed = mapBackendToForm(c);
            const score = calculateMatchScore(parsed, user);
            return { raw: c, parsed, matchScore: score };
        });

        // 2. Aplicar filtros de búsqueda
        const filtered = processed.filter(item => {
            const { parsed } = item;
            const matchesSearch = parsed.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  parsed.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = categoryFilter === '' || 
                                    parsed.categorias.includes(categoryFilter) ||
                                    item.raw.categoria === categoryFilter;
            
            const matchesModality = modalityFilter === '' || parsed.modalidad === modalityFilter.toLowerCase();
            
            return matchesSearch && matchesCategory && matchesModality;
        });

        // 3. Ordenar descendentemente por Score, y luego por ID (más recientes)
        return filtered.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return b.raw.id - a.raw.id;
        });
    }, [publishedConvocations, searchTerm, categoryFilter, modalityFilter, user]);

    const totalPages = Math.ceil(filteredConvocations.length / itemsPerPage);
    const paginatedConvocations = filteredConvocations.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );

    // Corregido: Usamos useEffect para evitar bugs de ciclo de vida
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, modalityFilter]);

    // --- LÓGICA DE SMART SCROLL Y PARPADEO ---
    const [highlightedCard, setHighlightedCard] = useState(null);

    useEffect(() => {
        const highlightId = location.state?.highlightId;
        
        if (highlightId && !loading && filteredConvocations.length > 0) {
            const targetId = Number(highlightId);
            // 1. Buscamos en qué página está la convocatoria
            const itemIndex = filteredConvocations.findIndex(c => c.parsed.id === targetId);
            
            if (itemIndex !== -1) {
                // 2. Calculamos la página matemáticamente y cambiamos si es necesario
                const targetPage = Math.floor(itemIndex / itemsPerPage) + 1;
                if (currentPage !== targetPage) {
                    setCurrentPage(targetPage);
                }
                
                // 3. Damos un respiro al DOM para renderizar, luego hacemos Scroll y Parpadeo
                setTimeout(() => {
                    const element = document.getElementById(`convocation-card-${targetId}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setHighlightedCard(targetId);
                        
                        // 4. Apagamos el parpadeo después de 3 segundos y limpiamos el historial
                        setTimeout(() => {
                            setHighlightedCard(null);
                            window.history.replaceState({}, document.title);
                        }, 3000);
                    }
                }, 150);
            }
        }
    }, [location.state?.highlightId, loading, filteredConvocations.length, currentPage]);

    const handleOpenDetails = (convocation) => {
        setSelectedConvocation(mapBackendToForm(convocation));
    };

    const handleOpenApplyModal = (convocation = null) => {
        if (convocation) setSelectedConvocation(mapBackendToForm(convocation));
        setObservaciones('');
        setIsApplyModalOpen(true);
    };

    // --- Lógica de Smart Match ---
    const matchInfo = useMemo(() => {
        if (!selectedConvocation || !user) return { habMatch: 100, dispMatch: true, isPerfect: true };
        
        const habUser = user.habilidades || [];
        const dispUser = user.disponibilidad || {};
        const habReq = selectedConvocation.skills || [];
        const horarioReq = selectedConvocation.horario || {};
        
        // 1. Match de Habilidades
        let habMatch = 100;
        if (habReq.length > 0) {
            const coincidencias = habReq.filter(req => 
                habUser.some(hu => hu.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(hu.toLowerCase()))
            );
            habMatch = Math.min(100, Math.round((coincidencias.length / habReq.length) * 100));
        }

        // 2. Match de Disponibilidad
        let dispMatch = true;
        if (selectedConvocation.tipoHorario === 'recurrente' && Object.keys(horarioReq).length > 0) {
            dispMatch = false;
            for (const dia of Object.keys(horarioReq)) {
                if (dispUser[dia] && dispUser[dia].length > 0) {
                    dispMatch = true;
                    break;
                }
            }
        }

        return {
            habMatch,
            dispMatch,
            isPerfect: habMatch === 100 && dispMatch
        };
    }, [selectedConvocation, user]);

    const handleConfirmApply = async () => {
        if (!selectedConvocation) return;
        setIsSubmitting(true);
        try {
            await applyToConvocation(selectedConvocation.id, observaciones);
            setIsApplyModalOpen(false);
            setSelectedConvocation(null);
            setSnackbar({ show: true, message: '¡Te has postulado con éxito!', type: 'success' });
        } catch (error) {
            console.error("Error al postular:", error);
            setSnackbar({ show: true, message: 'Ocurrió un error al postularte. Intenta de nuevo.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderAvailability = (parsedConv) => {
        if (parsedConv.tipoHorario === 'recurrente') {
            const diasActivos = Object.keys(parsedConv.horario);
            return (
                <div className="space-y-3 w-full">
                    <p className="text-xs text-on-surface-variant flex flex-wrap items-center gap-1.5 bg-white/50 px-3 py-2 rounded-lg w-full sm:w-fit">
                        <CalendarCheck className="w-4 h-4 text-primary/70 shrink-0"/> 
                        <span className="font-bold">Rango:</span> {formatDateFriendly(parsedConv.startDate)} al {formatDateFriendly(parsedConv.endDate)}
                    </p>
                    <div className="flex flex-col gap-1 w-full mx-auto">
                        {diasActivos.map(dia => {
                            const isMatch = user?.disponibilidad?.[dia] && user.disponibilidad[dia].length > 0;
                            
                            return (
                                <div key={dia} className={`flex flex-wrap gap-2 justify-between items-center px-3 py-2.5 rounded-xl text-sm transition-colors ${isMatch ? 'bg-success/10' : 'bg-transparent hover:bg-white/40'}`}>
                                    <span className={`font-bold capitalize flex items-center gap-2 ${isMatch ? 'text-success-dark' : 'text-on-surface-variant'}`}>
                                        {isMatch ? <CheckCircle className="w-4 h-4 text-success shrink-0" /> : <span className="w-4 h-4 shrink-0 opacity-0"></span>}
                                        {dia}
                                    </span>
                                    <span className={`font-bold px-3 py-1 rounded-md text-xs sm:text-sm ${isMatch ? 'bg-success-container/50 text-success-dark' : 'text-on-surface-variant bg-white/60'}`}>
                                        {formatTime12h(parsedConv.horario[dia].start)} - {formatTime12h(parsedConv.horario[dia].end)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            let isMatch = false;
            let dayOfWeek = '';
            if (parsedConv.fechaEvento) {
                const dateObj = new Date(parsedConv.fechaEvento + 'T00:00:00'); 
                const daysMap = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                dayOfWeek = daysMap[dateObj.getDay()];
                isMatch = user?.disponibilidad?.[dayOfWeek] && user.disponibilidad[dayOfWeek].length > 0;
            }

            return (
                <div className="space-y-3 w-full">
                    <p className="text-xs text-on-surface-variant flex flex-wrap items-center gap-1.5 bg-white/50 px-3 py-2 rounded-lg w-full sm:w-fit">
                        <CalendarCheck className="w-4 h-4 text-primary/70 shrink-0"/> 
                        <span className="font-bold">Fecha:</span> {formatDateFriendly(parsedConv.fechaEvento)}
                    </p>
                    <div className="flex flex-col gap-1 w-full mx-auto">
                        <div className={`flex flex-wrap gap-2 justify-between items-center px-3 py-2.5 rounded-xl text-sm transition-colors ${isMatch ? 'bg-success/10' : 'bg-transparent hover:bg-white/40'}`}>
                            <span className={`font-bold capitalize flex items-center gap-2 ${isMatch ? 'text-success-dark' : 'text-on-surface-variant'}`}>
                                {isMatch ? <CheckCircle className="w-4 h-4 text-success shrink-0" /> : <span className="w-4 h-4 shrink-0 opacity-0"></span>}
                                {dayOfWeek}
                            </span>
                            <span className={`font-bold px-3 py-1 rounded-md text-xs sm:text-sm ${isMatch ? 'bg-success-container/50 text-success-dark' : 'text-on-surface-variant bg-white/60'}`}>
                                {formatTime12h(parsedConv.horaInicio)} - {formatTime12h(parsedConv.horaFin)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const renderReadOnlyChips = (title, items, userMatchList = []) => {
        if (!items || items.length === 0) return null;
        
        // Verificamos si hay al menos una coincidencia para mostrar la leyenda
        const hasMatch = items.some(opt => 
            userMatchList.some(userItem => 
                userItem.toLowerCase().includes(opt.toLowerCase()) || 
                opt.toLowerCase().includes(userItem.toLowerCase())
            )
        );

        return (
            <div className="pt-4 border-t border-outline-variant/30">
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                    <label className="block text-label-large text-on-surface font-bold text-primary">{title}</label>
                    {hasMatch && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-success-dark bg-success/10 px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5 text-success" /> Coincide con tu perfil
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {items.map((opt, idx) => {

                        const isMatch = userMatchList.some(userItem => 
                            userItem.toLowerCase().includes(opt.toLowerCase()) || 
                            opt.toLowerCase().includes(userItem.toLowerCase())
                        );

                        return (
                            <span key={idx} className={`px-3 py-1.5 rounded-full text-xs font-medium border shadow-sm flex items-center gap-1 transition-colors ${isMatch ? 'bg-success/10 text-success border-success/30 font-bold' : 'bg-surface text-on-surface border-outline-variant'}`}>
                                {opt} {isMatch && <CheckCircle className="w-3.5 h-3.5" />}
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando convocatorias...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-12">
            
            <div className="mb-8">
                <h1 className="text-headline-medium text-on-surface font-bold mb-2">
                    Convocatorias Abiertas
                </h1>
                <p className="text-body-large text-on-surface-variant">
                    Explora las oportunidades de voluntariado, filtra por tus intereses y únete a nuestra causa.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-surface-container-lowest p-2 rounded-2xl">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por título o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface"
                    />
                </div>
                
                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="relative min-w-[200px]">
                        <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant w-5 h-5" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none appearance-none bg-surface cursor-pointer"
                        >
                            <option value="">Todas las Categorías</option>
                            {CATEGORIAS_INTERES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <select
                        value={modalityFilter}
                        onChange={(e) => setModalityFilter(e.target.value)}
                        className="min-w-[150px] px-4 py-3.5 rounded-xl border border-outline-variant focus:border-primary outline-none appearance-none bg-surface cursor-pointer"
                    >
                        <option value="">Modalidad</option>
                        {MODALIDADES.map(mod => (
                            <option key={mod} value={mod}>{mod}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredConvocations.length === 0 ? (
                <div className="card-elevated text-center py-16 animate-slide-up">
                    <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                    <h3 className="text-title-large text-on-surface mb-2">No se encontraron resultados</h3>
                    <p className="text-body-medium text-on-surface-variant max-w-md mx-auto">
                        Intenta ajustar tus filtros de búsqueda para ver más opciones disponibles.
                    </p>
                </div>
            ) : (
                <>
                    {/* Porventaje de sugerencia (Sistema de MACH) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {paginatedConvocations.map((item) => {
                            const { raw: rawConv, parsed, matchScore } = item;
                            const isAlreadyApplied = hasApplied(parsed.id);
                            const isHighlyRecommended = matchScore >= 80 && !isAlreadyApplied;
                            const isHighlighted = highlightedCard === parsed.id;

                            return (
                                <div 
                                    key={parsed.id} 
                                    id={`convocation-card-${parsed.id}`}
                                    className={`card-elevated overflow-hidden flex flex-col transition-all duration-500 relative border p-0 rounded-3xl isolate transform-gpu ${isHighlighted ? 'border-primary ring-4 ring-primary/40 bg-primary/5 scale-[1.02] shadow-xl z-10' : 'border-outline-variant/30 bg-surface hover:-translate-y-1 hover:shadow-elevation-4 scale-100 z-0'}`}
                                >
                                    
                                    {/* Insignia de Recomendación */}
                                    {isHighlyRecommended && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-b-xl shadow-md z-20 flex items-center gap-1.5 animate-slide-up">
                                            <Star className="w-3.5 h-3.5 fill-current" /> Recomendado para ti
                                        </div>
                                    )}

                                    <div className="p-6 pb-5 flex-1 flex flex-col mt-2">
                                        
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <div className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${parsed.modalidad === 'virtual' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                                                {parsed.modalidad === 'virtual' ? <Laptop size={13} /> : <MapPin size={13} />}
                                                {parsed.modalidad}
                                            </div>
                                            <div className="shrink-0 bg-success/10 text-success-dark px-3 py-1.5 rounded-full text-[10px] font-bold border border-success/20 uppercase tracking-wider">
                                                {Math.max(0, parsed.spots - parsed.cupos_ocupados)} vacantes
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-title-large font-bold text-on-surface mb-3 line-clamp-1 group-hover:text-primary transition-colors" title={parsed.title}>
                                            {parsed.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant mb-5 font-medium flex-wrap border-b border-outline-variant/30 pb-4">
                                            <span className="flex items-center gap-1.5 py-1">
                                                {parsed.tipoHorario === 'recurrente' ? <Clock3 className="w-3.5 h-3.5 text-primary/70"/> : <CalendarCheck className="w-3.5 h-3.5 text-primary/70"/>}
                                                {parsed.tipoHorario === 'recurrente' ? 'Múltiples Días' : formatDateFriendly(parsed.fechaEvento)}
                                            </span>
                                            <span className="flex items-center gap-1.5 py-1">
                                                {parsed.modalidad === 'virtual' ? <Laptop className="w-3.5 h-3.5 text-primary/70"/> : <MapPin className="w-3.5 h-3.5 text-primary/70"/>}
                                                <span className="truncate max-w-[180px]">{parsed.modalidad === 'virtual' ? 'Remoto' : (parsed.location || 'Sede Principal')}</span>
                                            </span>
                                        </div>
                                        
                                        <p className="text-body-medium text-on-surface-variant mb-5 line-clamp-2 flex-1">
                                            {parsed.description}
                                        </p>
                                        
                                        {parsed.skills.length > 0 && (
                                            <div className="mb-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                                                <p className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-3 flex items-center gap-1.5"><Target className="w-4 h-4 text-primary"/> Habilidades requeridas:</p>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {parsed.skills.slice(0, 3).map((skill, idx) => (
                                                        <span key={idx} className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">{skill}</span>
                                                    ))}
                                                    {parsed.skills.length > 3 && (
                                                        <span className="text-on-surface-variant text-xs font-bold py-1.5 flex items-center">+{parsed.skills.length - 3} más</span>
                                                    )}
                                                </div>
                                            </div>
                                        ) }

                                        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                                                    <Users className="w-4 h-4 text-primary" />
                                                    PROGRESO DE CUPOS
                                                </span>
                                                <span className="text-xs font-bold text-primary bg-white px-2 py-0.5 rounded-full border border-outline-variant/20">{parsed.cupos_ocupados} / {parsed.spots}</span>
                                            </div>
                                            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                    className="h-full bg-primary transition-all duration-500 rounded-full" 
                                                    style={{ width: `${Math.min(100, (parsed.cupos_ocupados / parsed.spots) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-3 mt-auto pt-5 border-t border-outline-variant/30">
                                            <button onClick={() => handleOpenDetails(rawConv)} className="btn-tonal p-3.5 rounded-xl hover:bg-surface-container-high transition-colors text-on-surface-variant shrink-0" title="Ver Detalles Completos">
                                                <Info className="w-5 h-5" />
                                            </button>

                                            {isAlreadyApplied ? (
                                                <div className="flex-1 flex items-center justify-center gap-2 text-success-dark font-bold bg-success/10 py-3.5 rounded-xl border border-success/20 shadow-sm text-sm">
                                                    <CheckCircle className="w-5 h-5 shrink-0" />
                                                    <span className="truncate">Postulación Registrada</span>
                                                </div>
                                            ) : (
                                                <button onClick={() => handleOpenApplyModal(rawConv)} className="btn-filled flex-1 py-3.5 rounded-xl font-bold flex justify-center items-center shadow-md shadow-primary/20 text-sm hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all">
                                                    <span className="truncate">Postularme Ahora</span> <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 transition-colors">
                                <ChevronLeft className="w-6 h-6 text-primary" />
                            </button>
                            <span className="text-body-large text-on-surface-variant">
                                Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}
                            </span>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 transition-colors">
                                <ChevronRight className="w-6 h-6 text-primary" />
                            </button>
                        </div>
                    )}
                </>
            )}

            {selectedConvocation && !isApplyModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
                    <div className="absolute inset-0 bg-black/70 transition-opacity duration-300 animate-fade-in" onClick={() => setSelectedConvocation(null)}></div>
                    <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
                        
                        <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30 z-20 shrink-0">
                            <h2 className="text-title-large text-on-surface font-bold tracking-tight pr-4 truncate">
                                {selectedConvocation.title}
                            </h2>
                            <button onClick={() => setSelectedConvocation(null)} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant shrink-0">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh] space-y-6 bg-surface-container-lowest">
                            
                            {/* Tarjeta de Smart Match (Emparejamiento Inteligente) */}
                            {!hasApplied(selectedConvocation.id) && (
                                <div className={`p-5 rounded-2xl border shadow-sm ${matchInfo.isPerfect ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20'}`}>
                                    <h3 className={`text-label-large font-bold flex items-center gap-2 mb-3 ${matchInfo.isPerfect ? 'text-success' : 'text-warning'}`}>
                                        <Activity className="w-5 h-5"/> Tu Nivel de Compatibilidad
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 bg-surface/60 p-3 rounded-xl">
                                            {matchInfo.habMatch >= 80 ? <CheckCircle className="w-5 h-5 text-success shrink-0"/> : <AlertTriangle className="w-5 h-5 text-warning shrink-0"/>}
                                            <div>
                                                <p className="text-body-small font-bold text-on-surface">Habilidades Requeridas</p>
                                                <p className="text-xs text-on-surface-variant">{matchInfo.habMatch}% de coincidencia con tu perfil.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-surface/60 p-3 rounded-xl">
                                            {matchInfo.dispMatch ? <CheckCircle className="w-5 h-5 text-success shrink-0"/> : <AlertTriangle className="w-5 h-5 text-warning shrink-0"/>}
                                            <div>
                                                <p className="text-body-small font-bold text-on-surface">Disponibilidad de Tiempo</p>
                                                <p className="text-xs text-on-surface-variant">{matchInfo.dispMatch ? 'Tu horario coincide.' : 'Posible conflicto de horario.'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 1. Descripción de la Actividad */}
                            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/30 shadow-sm">
                                <h3 className="text-label-large text-primary font-bold flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4"/> Descripción de la Actividad
                                </h3>
                                <p className="text-body-large text-on-surface-variant whitespace-pre-wrap leading-relaxed">
                                    {selectedConvocation.description}
                                </p>
                            </div>

                            {/* 2. Detalles Logísticos */}
                            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/30 shadow-sm">
                                <h3 className="text-label-large text-primary font-bold flex items-center gap-2 mb-5 border-b border-outline-variant/30 pb-3">
                                    <Target className="w-4 h-4"/> Detalles Logísticos
                                </h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Modalidad</label>
                                        <div className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider items-center gap-1.5 shadow-sm ${selectedConvocation.modalidad === 'virtual' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-orange-50 text-orange-700 border border-orange-200'}`}>
                                            {selectedConvocation.modalidad === 'virtual' ? <Laptop size={14}/> : <Home size={14}/>}
                                            {selectedConvocation.modalidad}
                                        </div>
                                    </div>

                                    <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Cupos Requeridos</label>
                                        <p className="text-body-medium text-on-surface flex items-center gap-1">
                                            <Users className="w-4 h-4 text-primary"/> {selectedConvocation.spots} Voluntarios
                                        </p>
                                    </div>

                                    <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20 sm:col-span-2">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                                            {selectedConvocation.modalidad === 'virtual' ? 'Enlace de Reunión' : 'Dirección'}
                                        </label>
                                        {selectedConvocation.modalidad === 'virtual' && selectedConvocation.location.includes('http') ? (
                                            <a href={selectedConvocation.location} target="_blank" rel="noopener noreferrer" className="text-body-medium text-primary hover:underline break-all flex items-start gap-1">
                                                <Laptop className="w-4 h-4 mt-0.5 shrink-0"/> {selectedConvocation.location}
                                            </a>
                                        ) : selectedConvocation.modalidad === 'presencial' && selectedConvocation.link_google_maps ? (
                                            <a href={selectedConvocation.link_google_maps} target="_blank" rel="noopener noreferrer" className="text-body-medium text-primary font-bold hover:underline break-all flex items-start gap-1">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0"/> {selectedConvocation.location || 'Ver en Google Maps'}
                                            </a>
                                        ) : (
                                            <p className="text-body-medium text-on-surface flex items-start gap-1">
                                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary"/> {selectedConvocation.location || 'Por definir'}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                    <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                                        <label className="block text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                                            <Clock3 className="w-5 h-5 opacity-80"/> Disponibilidad ({selectedConvocation.tipoHorario})
                                        </label>
                                        {matchInfo.dispMatch && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-success-dark bg-success/10 px-2.5 py-1 rounded-full">
                                                <CheckCircle className="w-3.5 h-3.5 text-success" /> Coincide con tu horario
                                            </span>
                                        )}
                                    </div>
                                    {renderAvailability(selectedConvocation)}
                                </div>
                            </div>

                            {/* 3. Arrays / Chips */}
                            <div className="bg-surface p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
                                {renderReadOnlyChips("Categorías", selectedConvocation.categorias, user?.intereses || [])}
                                {renderReadOnlyChips("Requisitos", selectedConvocation.skills, user?.habilidades || [])}
                                {renderReadOnlyChips("Beneficios Ofrecidos", selectedConvocation.beneficios)}
                                
                                {selectedConvocation.categorias.length === 0 && selectedConvocation.skills.length === 0 && selectedConvocation.beneficios.length === 0 && (
                                    <p className="text-body-medium text-on-surface-variant italic py-2">No hay etiquetas adicionales registradas.</p>
                                )}
                            </div>

                        </div>

                        <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20">
                            <button type="button" onClick={() => setSelectedConvocation(null)} className="btn-tonal flex-1 font-bold">
                                Cerrar
                            </button>
                            {hasApplied(selectedConvocation.id) ? (
                                <button disabled className="btn-filled bg-success text-white opacity-100 cursor-default flex-1 font-bold flex justify-center items-center gap-2">
                                    <CheckCircle className="w-5 h-5"/> Ya estás postulado
                                </button>
                            ) : (
                                <button onClick={() => { setIsApplyModalOpen(true); }} className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg">
                                    Postularme Ahora <ArrowRight className="w-4 h-4 ml-1" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {isApplyModalOpen && selectedConvocation && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 animate-fade-in">
                    <div className="bg-surface rounded-3xl w-full max-w-md shadow-elevation-5 overflow-hidden">
                        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface">
                            <h3 className="text-title-large font-bold">Confirmar Postulación</h3>
                            <button 
                                onClick={() => { setIsApplyModalOpen(false); setSelectedConvocation(null); }} 
                                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 bg-surface-container-lowest">
                            <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                                <p className="text-body-medium text-on-surface font-medium">
                                    Estás a punto de postularte a: <br/>
                                    <span className="font-bold text-primary">{selectedConvocation.title}</span>
                                </p>
                            </div>

                            {/* Advertencia Amigable si no hay match perfecto */}
                            {!matchInfo.isPerfect && (
                                <div className="mb-6 p-4 bg-warning/10 rounded-xl border border-warning/30 flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-label-large font-bold text-warning mb-1">Aviso de Compatibilidad</p>
                                        <p className="text-body-small text-on-surface-variant">
                                            {!matchInfo.dispMatch ? 'Tu disponibilidad no coincide exactamente con el horario requerido. ' : ''}
                                            {matchInfo.habMatch < 100 ? `Tienes un ${matchInfo.habMatch}% de coincidencia en las habilidades solicitadas. ` : ''}
                                            ¿Estás seguro de que deseas comprometerte y postularte de todos modos?
                                        </p>
                                    </div>
                                </div>
                            )}

                            <label className="block text-label-large text-on-surface mb-2 font-bold">
                                ¿Por qué te gustaría participar? (Opcional)
                            </label>
                            <textarea
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                placeholder="Escribe aquí si tienes experiencia, si dispones de vehículo, etc..."
                                className="w-full p-4 rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all min-h-[120px] bg-surface"
                            />
                            
                            <div className="mt-8 flex gap-3 justify-end">
                                <button 
                                    onClick={() => { setIsApplyModalOpen(false); setSelectedConvocation(null); }} 
                                    className="btn-tonal px-6"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleConfirmApply} 
                                    disabled={isSubmitting} 
                                    className="btn-filled px-8 font-bold shadow-primary/30 shadow-lg"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Confirmar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Snackbar 
                show={snackbar.show} 
                message={snackbar.message} 
                type={snackbar.type} 
                onClose={() => setSnackbar({ ...snackbar, show: false })} 
            />
        </div>
    );
}