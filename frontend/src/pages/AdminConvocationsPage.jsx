import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearConvocatoria } from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout';
import {
    Plus, Edit, Trash2, X, Save, Calendar, MapPin, Users,
    Briefcase, Pause, Play, Archive, Clock,
    MessageCircle, Award, Search, Filter, ChevronDown, Loader2, 
    Check, ChevronUp, Clock3 // <--- Imports completos
} from 'lucide-react';

// --- LISTAS MAESTRAS ---
const CATEGORIAS_INTERES = [
  "Educación Infantil", "Medio Ambiente", "Adulto Mayor", 
  "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", 
  "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial",
  "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal"
];

const HABILIDADES_OPCIONES = [
  "Liderazgo", "Trabajo en Equipo", "Comunicación Asertiva",
  "Inglés Básico", "Inglés Avanzado", "Excel / Office", 
  "Diseño Gráfico", "Programación / IT", 
  "Primeros Auxilios", "Fotografía y Video", "Redacción", 
  "Manejo de Redes Sociales", "Contabilidad Básica", "Enseñanza / Pedagogía",
  "Conducción", "Cocina", "Manualidades"
];

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

function ConvocationFormModal({ convocation, onSave, onClose }) {
    // ESTADO DEL FORMULARIO
    const [formData, setFormData] = useState(convocation || {
        title: '', description: '', 
        // Logística
        location: '', locationType: 'presencial', spots: 1, 
        whatsappGroupLink: '',
        // Fechas generales
        startDate: '', endDate: '',
        // Matchmaking
        categorias: [],
        skills: [],
        // HORARIO AVANZADO
        tipoHorario: 'recurrente', // 'unico' | 'recurrente'
        // Campos para evento único
        fechaEvento: '',
        horaInicio: '',
        horaFin: '',
        // Campos para recurrente: Objeto { "Lunes": { start: "08:00", end: "12:00" }, ... }
        horario: {} 
    });

    // Estados para "Ver Más / Ver Menos"
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);

    // --- LOGICA DE SELECCIÓN (Chips) ---
    const toggleSelection = (field, item, max) => {
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) {
                return { ...prev, [field]: list.filter(i => i !== item) };
            } else {
                if (max && list.length >= max) return prev;
                return { ...prev, [field]: [...list, item] };
            }
        });
    };

    // --- LÓGICA DE HORARIOS RECURRENTES (CON AUTOCOMPLETADO INTELIGENTE) ---
    // 1. Activar/Desactivar un día
    const toggleDay = (day) => {
        setFormData(prev => {
            const newHorario = { ...prev.horario };
            
            if (newHorario[day]) {
                // Si ya existe, lo borramos (desactivar)
                delete newHorario[day];
            } else {
                // Si no existe, lo creamos (activar)
                // MAGIA: Buscamos si ya hay otro día configurado para copiar sus horas
                const existingDay = Object.values(newHorario).find(h => h.start && h.end);
                
                if (existingDay) {
                    // Si encontramos uno, copiamos sus horas por defecto
                    newHorario[day] = { start: existingDay.start, end: existingDay.end };
                } else {
                    // Si es el primero, lo dejamos vacío
                    newHorario[day] = { start: '', end: '' };
                }
            }
            return { ...prev, horario: newHorario };
        });
    };

    // 2. Cambiar horas de un día específico
    const handleDayTimeChange = (day, field, value) => {
        setFormData(prev => ({
            ...prev,
            horario: {
                ...prev.horario,
                [day]: { ...prev.horario[day], [field]: value }
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de limpieza antes de enviar
        const payload = { ...formData, spots: parseInt(formData.spots) || 1 };
        
        // Si es evento único, forzamos las fechas de inicio/fin al día del evento y limpiamos horario recurrente
        if (payload.tipoHorario === 'unico') {
            payload.startDate = payload.fechaEvento;
            payload.endDate = payload.fechaEvento;
            payload.horario = {}; 
        }
        
        onSave(payload);
    };

    // --- RENDERIZADOR DE CHIPS CON CONTADOR Y "VER MÁS" ---
    const renderChipsSection = (title, field, options, showAll, setShowAll, max) => {
        const visibleOptions = showAll ? options : options.slice(0, 8); // Muestra solo 8 al inicio
        const selectedCount = formData[field].length;
        
        return (
            <div className="pt-4 border-t border-outline-variant/30">
                <div className="flex justify-between items-baseline mb-2">
                    <label className="block text-label-large text-on-surface font-bold text-primary">{title}</label>
                    <span className={`text-xs font-medium ${max && selectedCount >= max ? 'text-primary' : 'text-on-surface-variant'}`}>
                        ({selectedCount}{max ? `/${max}` : ''} seleccionados)
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {visibleOptions.map(opt => (
                        <button key={opt} type="button" onClick={() => toggleSelection(field, opt, max)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1
                            ${formData[field].includes(opt) ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary/50'}`}>
                            {formData[field].includes(opt) && <Check size={12} />} {opt}
                        </button>
                    ))}
                </div>
                {options.length > 8 && (
                    <button type="button" onClick={() => setShowAll(!showAll)} className="mt-2 text-xs text-primary font-bold flex items-center hover:underline">
                        {showAll ? <><ChevronUp size={14} className="mr-1"/> Ver menos</> : <><ChevronDown size={14} className="mr-1"/> Ver más ({options.length - 8} restantes)</>}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform-gpu animate-scale-in border border-outline-variant/20">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">{convocation ? 'Editar Convocatoria' : 'Nueva Convocatoria'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"><X className="w-5 h-5" /></button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    <form id="convocation-form" onSubmit={handleSubmit} className="space-y-5 animate-fade-in" style={{ animationFillMode: 'both', animationDelay: '150ms' }}>
                        
                        {/* 1. Datos Básicos */}
                        <div className="space-y-4">
                            <div><label className="block text-label-large text-on-surface mb-1.5">Título *</label><input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: Jornada de Vacunación" /></div>
                            <div><label className="block text-label-large text-on-surface mb-1.5">Descripción *</label><textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-outlined resize-none focus:bg-white" rows={3} /></div>
                        </div>

                        {/* 2. CATEGORÍAS (Con Contador) */}
                        {renderChipsSection("Categoría de la Convocatoria", "categorias", CATEGORIAS_INTERES, showAllCats, setShowAllCats, 3)}

                        {/* 3. HABILIDADES (Con Contador) */}
                        {renderChipsSection("Habilidades Requeridas", "skills", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills, null)}

                        {/* 4. SECCIÓN DE HORARIOS INTELIGENTE */}
                        <div className="pt-6 border-t border-outline-variant/30">
                            <label className="block text-label-large text-on-surface mb-3 font-bold text-primary flex items-center gap-2">
                                <Clock3 size={18} /> Disponibilidad Requerida
                            </label>

                            {/* Switch Tipo de Horario */}
                            <div className="flex bg-surface-container rounded-lg p-1 mb-4 w-fit">
                                <button type="button" onClick={() => setFormData({...formData, tipoHorario: 'unico'})} 
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'unico' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                                    Evento Único
                                </button>
                                <button type="button" onClick={() => setFormData({...formData, tipoHorario: 'recurrente'})} 
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'recurrente' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                                    Recurrente
                                </button>
                            </div>

                            {/* CONDICIONAL: Evento Único */}
                            {formData.tipoHorario === 'unico' ? (
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                                    <div className="md:col-span-3">
                                        <label className="text-xs font-bold text-primary uppercase tracking-wide mb-1 block">Fecha del Evento</label>
                                        <input type="date" required={formData.tipoHorario === 'unico'} value={formData.fechaEvento} onChange={(e) => setFormData({...formData, fechaEvento: e.target.value})} className="input-outlined bg-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-on-surface-variant mb-1 block">Hora Inicio</label>
                                        <input type="time" required={formData.tipoHorario === 'unico'} value={formData.horaInicio} onChange={(e) => setFormData({...formData, horaInicio: e.target.value})} className="input-outlined bg-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-on-surface-variant mb-1 block">Hora Fin</label>
                                        <input type="time" required={formData.tipoHorario === 'unico'} value={formData.horaFin} onChange={(e) => setFormData({...formData, horaFin: e.target.value})} className="input-outlined bg-white" />
                                    </div>
                                </div>
                            ) : (
                                /* CONDICIONAL: Recurrente (Lista de Días con Horas y Autocompletado) */
                                <div className="bg-surface-container/30 rounded-xl border border-outline-variant/50 overflow-hidden animate-fade-in divide-y divide-outline-variant/20">
                                    {DIAS_SEMANA.map(dia => {
                                        const isSelected = !!formData.horario[dia];
                                        return (
                                            <div key={dia} className={`p-3 transition-colors ${isSelected ? 'bg-white' : 'hover:bg-white/40'}`}>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                    
                                                    {/* Toggle del Día */}
                                                    <div className="flex items-center gap-3 min-w-[120px]">
                                                        <button type="button" onClick={() => toggleDay(dia)}
                                                            className={`w-10 h-6 rounded-full p-1 transition-colors relative ${isSelected ? 'bg-primary' : 'bg-outline-variant'}`}>
                                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isSelected ? 'translate-x-4' : 'translate-x-0'}`} />
                                                        </button>
                                                        <span className={`text-sm font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>{dia}</span>
                                                    </div>

                                                    {/* Inputs de Hora (Solo si está seleccionado) */}
                                                    {isSelected && (
                                                        <div className="flex items-center gap-2 flex-1 animate-fade-in">
                                                            <div className="flex-1">
                                                                <input type="time" required value={formData.horario[dia].start} onChange={(e) => handleDayTimeChange(dia, 'start', e.target.value)} 
                                                                    className="w-full text-xs px-2 py-1.5 rounded-lg border border-outline-variant bg-surface focus:bg-white focus:border-primary outline-none" />
                                                            </div>
                                                            <span className="text-on-surface-variant text-xs">-</span>
                                                            <div className="flex-1">
                                                                <input type="time" required value={formData.horario[dia].end} onChange={(e) => handleDayTimeChange(dia, 'end', e.target.value)} 
                                                                    className="w-full text-xs px-2 py-1.5 rounded-lg border border-outline-variant bg-surface focus:bg-white focus:border-primary outline-none" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* 5. Logística Final (Fechas Generales y Ubicación) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                            {formData.tipoHorario === 'recurrente' && (
                                <>
                                    <div><label className="block text-label-large text-on-surface mb-1.5">Inicio Convocatoria</label><input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="input-outlined focus:bg-white" /></div>
                                    <div><label className="block text-label-large text-on-surface mb-1.5">Cierre Convocatoria</label><input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="input-outlined focus:bg-white" /></div>
                                </>
                            )}
                            <div><label className="block text-label-large text-on-surface mb-1.5">Ubicación</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input-outlined focus:bg-white" placeholder="Ej: Sede Principal" /></div>
                            <div><label className="block text-label-large text-on-surface mb-1.5">Vacantes</label><input type="number" required min="1" value={formData.spots} onChange={(e) => setFormData({ ...formData, spots: e.target.value })} className="input-outlined text-center focus:bg-white" /></div>
                        </div>

                        <div className="pt-2"><label className="block text-label-large text-on-surface mb-1.5">Grupo WhatsApp</label><input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://..." /></div>

                    </form>
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-6 py-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="convocation-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg"><Save className="w-4 h-4" /> Publicar</button>
                </div>
            </div>
        </div>
    );
}

export default function AdminConvocationsPage() {
    const {
        convocations, updateConvocation, deleteConvocation,
        pauseConvocation, publishConvocation, closeConvocation,
        getActiveConvocations, getClosedConvocations
    } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConvocation, setEditingConvocation] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    const activeConvocations = getActiveConvocations();
    const closedConvocations = getClosedConvocations();

    const filteredActiveConvocations = activeConvocations.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filteredClosedConvocations = closedConvocations.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSave = async (data) => {
        try {
            if (editingConvocation) {
                updateConvocation(editingConvocation.id, data); // Mock update
                alert("⚠️ Edición solo local por ahora.");
            } else {
                await crearConvocatoria(data);
                alert("✅ ¡Convocatoria creada exitosamente en el servidor!");
            }
            setIsModalOpen(false);
            setEditingConvocation(null);
        } catch (error) {
            console.error("Error:", error);
            alert(`❌ Error: ${error.error || error.detail || "Error desconocido"}`);
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar esta convocatoria?')) {
            deleteConvocation(id);
        }
    };

    const getStatusBadge = (status) => {
        const styles = { published: 'bg-success-container text-success', paused: 'bg-warning-container text-warning', closed: 'bg-surface-container text-on-surface-variant' };
        return <span className={`px-3 py-1 rounded-full text-label-small font-medium ${styles[status] || styles.published}`}>{status}</span>;
    };

    // --- RENDERIZADO PRINCIPAL CON LAYOUT MÓVIL OPTIMIZADO ---
    return (
        <AdminLayout 
            title="Gestión de Convocatorias" 
            subtitle="Crea, edita y administra las convocatorias de voluntariado."
        >
            {/* Header Actions & Tabs */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    <button onClick={() => setActiveTab('active')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'active' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        Activas ({activeConvocations.length})
                    </button>
                    <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'history' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <Archive className="w-4 h-4 inline mr-1" /> Historial
                    </button>
                </div>
                
                {/* BOTÓN PC */}
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled hidden sm:flex">
                    <Plus className="w-4 h-4" /> Nueva Convocatoria
                </button>
            </div>

            {/* Search Bar */}
            <div className="sticky top-0 z-10 bg-surface/90 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent">
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <input type="text" placeholder="Buscar convocatorias..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" />
                    </div>
                    {activeTab === 'active' && (
                        <div className="relative w-1/3 sm:w-auto min-w-[140px]">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant" />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 sm:pl-10 pr-8 appearance-none bg-white/80 focus:bg-white text-sm sm:text-base">
                                <option value="all">Todos</option>
                                <option value="published">Publicadas</option>
                                <option value="paused">Pausadas</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-on-surface-variant pointer-events-none" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content List */}
            {activeTab === 'active' && (
                <div className="space-y-4 pt-2">
                    {filteredActiveConvocations.length === 0 ? (
                        <div className="card text-center py-12">
                            <Briefcase className="w-16 h-16 text-on-surface-variant mx-auto mb-4" />
                            <h3 className="text-title-large text-on-surface">No hay convocatorias activas</h3>
                        </div>
                    ) : (
                        filteredActiveConvocations.map(convocation => (
                            <div key={convocation.id} className="card-elevated">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h3 className="text-title-medium sm:text-title-large font-medium truncate">{convocation.title}</h3>
                                            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs sm:text-sm font-bold flex items-center shrink-0">
                                                <Users className="w-3 h-3 mr-1"/> {convocation.applicants || 0} / {convocation.spots}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-3">{getStatusBadge(convocation.status)}</div>
                                        <p className="text-body-small sm:text-body-medium text-on-surface-variant mb-3 line-clamp-3">{convocation.description}</p>
                                        <div className="flex flex-wrap gap-3 text-xs sm:text-body-small text-on-surface-variant">
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {convocation.commitment}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {convocation.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40 mt-2 lg:mt-0">
                                        <button onClick={() => { setEditingConvocation(convocation); setIsModalOpen(true); }} className="btn-tonal py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                            <Edit className="w-4 h-4" /> <span className="hidden sm:inline">Editar</span>
                                        </button>
                                        
                                        {convocation.status === 'published' ? (
                                            <button onClick={() => pauseConvocation(convocation.id)} className="btn-outlined border-warning text-warning hover:bg-warning/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                                <Pause className="w-4 h-4" /> <span className="hidden sm:inline">Pausar</span>
                                            </button>
                                        ) : (
                                            <button onClick={() => publishConvocation(convocation.id)} className="btn-outlined border-success text-success hover:bg-success/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                                <Play className="w-4 h-4" /> <span className="hidden sm:inline">Publicar</span>
                                            </button>
                                        )}

                                        <button onClick={() => closeConvocation(convocation.id)} className="btn-outlined py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm">
                                            <Archive className="w-4 h-4" /> <span className="hidden sm:inline">Cerrar</span>
                                        </button>

                                        <button onClick={() => handleDelete(convocation.id)} className="btn-outlined border-error text-error hover:bg-error/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center transition-colors text-sm">
                                            <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* BOTÓN FLOTANTE (FAB) PARA MÓVILES */}
            <button 
                onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} 
                className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"
                style={{ backdropFilter: "blur(8px)" }}
            >
                <Plus className="w-6 h-6" />
            </button>

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}