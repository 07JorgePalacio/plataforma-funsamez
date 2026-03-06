import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
    MapPin, Users, ArrowRight, Search, Filter,
    ChevronLeft, ChevronRight, Laptop, Clock3, CalendarCheck, Target, Briefcase, Share2
} from 'lucide-react';

const CATEGORIAS_INTERES = ["Salud", "Capacitación / Cursos", "Estética y Belleza", "Educación Infantil", "Medio Ambiente", "Adulto Mayor", "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial", "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal"];
const MODALIDADES = ["Presencial", "Virtual", "Híbrido"];
const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// --- HELPERS ARQUITECTÓNICOS (BLINDADOS) ---
const formatDateFriendly = (isoString) => {
    if (!isoString) return 'Por definir';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return String(isoString).split('T')[0] || 'Por definir';
    }
};

const mapBackendToForm = (convocation) => {
    try {
        if (!convocation) return null;
        
        let skillsArray = [];
        if (convocation.habilidades_requeridas) {
            skillsArray = typeof convocation.habilidades_requeridas === 'string'
                ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean)
                : Array.isArray(convocation.habilidades_requeridas) ? convocation.habilidades_requeridas : [];
        }
        
        const horarioData = convocation.horario || {};
        let tipoHorario = 'unico', fechaEvento = '';
        
        if (horarioData.tipo === 'unico') {
            tipoHorario = 'unico';
            fechaEvento = horarioData.fecha || '';
        } else if (horarioData.tipo === 'recurrente' || Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
            tipoHorario = 'recurrente';
        }

        let categorias = [];
        if (Array.isArray(convocation.categorias)) {
            categorias = convocation.categorias;
        } else if (convocation.categoria) {
            categorias = [convocation.categoria];
        }

        return {
            id: convocation.id || Math.random(),
            title: convocation.title || convocation.titulo || 'Convocatoria sin título',
            description: convocation.description || convocation.descripcion || 'Sin descripción detallada.',
            location: convocation.ubicacion || 'Sede Principal',
            modalidad: convocation.modalidad ? String(convocation.modalidad).toLowerCase() : 'presencial',
            spots: Number(convocation.cupos_disponibles) || 1,
            cupos_ocupados: Number(convocation.cupos_ocupados) || 0,
            fechaEvento,
            tipoHorario,
            categorias,
            skills: skillsArray
        };
    } catch (error) {
        console.error("Error crítico mapeando convocatoria:", error, convocation);
        return null;
    }
};

export default function PublicConvocationsPage() {
    // 1. Extraemos con valores por defecto seguros por si el contexto falla
    const appCtx = useApp() || {};
    const getPublishedConvocations = appCtx.getPublishedConvocations || (() => []);
    const user = appCtx.user || null;
    const loading = appCtx.loading || false;
    
    const navigate = useNavigate();
    
    // 2. Garantizamos que SIEMPRE sea un array
    const rawData = getPublishedConvocations();
    const rawConvocations = Array.isArray(rawData) ? rawData : [];

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [modalityFilter, setModalityFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // 3. Memoización Blindada con Try/Catch
    const filteredConvocations = useMemo(() => {
        try {
            const processed = rawConvocations
                .filter(c => c != null)
                .map(c => ({ raw: c, parsed: mapBackendToForm(c) }))
                .filter(item => item.parsed !== null);

            const filtered = processed.filter(item => {
                const { parsed, raw } = item;
                
                const searchLower = String(searchTerm || '').toLowerCase();
                const titleMatch = String(parsed.title || '').toLowerCase();
                const descMatch = String(parsed.description || '').toLowerCase();
                
                const matchesSearch = titleMatch.includes(searchLower) || descMatch.includes(searchLower);
                
                const matchesCategory = !categoryFilter || 
                    (parsed.categorias && parsed.categorias.includes(categoryFilter)) || 
                    raw.categoria === categoryFilter;
                    
                const matchesModality = !modalityFilter || 
                    parsed.modalidad === String(modalityFilter).toLowerCase();
                    
                return matchesSearch && matchesCategory && matchesModality;
            });

            return filtered.sort((a, b) => (b.raw?.id || 0) - (a.raw?.id || 0));
        } catch (error) {
            console.error("Error en useMemo de filtrado:", error);
            return [];
        }
    }, [rawConvocations, searchTerm, categoryFilter, modalityFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredConvocations.length / itemsPerPage));
    const paginatedConvocations = filteredConvocations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, modalityFilter]);

    const handleApplyClick = (convocationId) => {
        if (user) {
            navigate('/voluntario/convocatorias', { state: { highlightId: convocationId } });
        } else {
            navigate('/login');
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-surface py-32 animate-fade-in">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-body-large text-on-surface-variant font-medium">Cargando oportunidades...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-surface py-12 animate-fade-in pb-32 md:pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Cabecera */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-label-large mb-4">
                        <Briefcase className="w-4 h-4" />
                        Oportunidades de Voluntariado
                    </span>
                    <h1 className="text-display-small sm:text-display-medium text-on-surface font-bold mb-4">
                        Convocatorias Abiertas
                    </h1>
                    <p className="text-body-large text-on-surface-variant max-w-2xl mx-auto">
                        Únete a nuestra comunidad de voluntarios y ayuda a transformar vidas.
                        Explora las oportunidades disponibles y forma parte del cambio.
                    </p>
                </div>

                {/* Filtros */}
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

                {/* Grid de Convocatorias */}
                {filteredConvocations.length === 0 ? (
                    <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
                        <Briefcase className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                        <h3 className="text-title-large text-on-surface mb-2">No se encontraron resultados</h3>
                        <p className="text-body-large text-on-surface-variant mb-6 max-w-md mx-auto">
                            Intenta ajustar tus filtros de búsqueda o vuelve pronto para ver nuevas oportunidades.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {paginatedConvocations.map((item) => {
                                const { parsed } = item;
                                
                                return (
                                    <div key={parsed.id} className="card-elevated overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-elevation-4 transition-all duration-300 relative border border-outline-variant/30 p-0 bg-surface rounded-3xl">
                                        
                                        {/* Botón Flotante Compartir (Nativo y Seguro) */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <button 
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: parsed.title,
                                                            text: parsed.description,
                                                            url: `${window.location.origin}/convocatorias`
                                                        }).catch(console.error);
                                                    } else {
                                                        navigator.clipboard.writeText(`${window.location.origin}/convocatorias`);
                                                        alert("¡Enlace copiado al portapapeles!");
                                                    }
                                                }}
                                                className="p-2.5 glass bg-surface/80 backdrop-blur-md border border-outline-variant/50 rounded-full shadow-sm text-on-surface-variant hover:text-primary hover:bg-surface transition-all active:scale-95"
                                                title="Compartir convocatoria"
                                            >
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="p-6 pb-5 flex-1 flex flex-col mt-2">
                                            
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${parsed.modalidad === 'virtual' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                                                    {parsed.modalidad === 'virtual' ? <Laptop size={13} /> : <MapPin size={13} />}
                                                    {parsed.modalidad}
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-title-large font-bold text-on-surface mb-3 line-clamp-1 group-hover:text-primary transition-colors pr-10" title={parsed.title}>
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
                                            
                                            {parsed.skills && parsed.skills.length > 0 && (
                                                <div className="mb-6 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
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
                                            
                                            <div className="flex gap-3 mt-auto pt-5 border-t border-outline-variant/30">
                                                <button onClick={() => handleApplyClick(parsed.id)} className="btn-filled flex-1 py-3.5 rounded-xl font-bold flex justify-center items-center shadow-md shadow-primary/20 text-sm hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all">
                                                    <span className="truncate">Postularme Ahora</span> <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 mt-10">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 transition-colors bg-white shadow-sm border border-outline-variant/30">
                                    <ChevronLeft className="w-6 h-6 text-primary" />
                                </button>
                                <span className="text-body-large text-on-surface-variant font-medium">
                                    Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}
                                </span>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 transition-colors bg-white shadow-sm border border-outline-variant/30">
                                    <ChevronRight className="w-6 h-6 text-primary" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}