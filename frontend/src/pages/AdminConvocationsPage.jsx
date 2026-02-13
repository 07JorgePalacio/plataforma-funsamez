import { useState, useEffect } from 'react';
import { 
    crearConvocatoria, 
    actualizarConvocatoria, 
    cambiarEstadoConvocatoria, 
    eliminarConvocatoria 
} from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout';
import TimePickerMD3 from '../components/TimePickerMD3';
import {
    Plus, Edit, Trash2, X, Save, MapPin, Users,
    Briefcase, Pause, Play, Archive, Search, Filter, ChevronDown, 
    Check, ChevronUp, Clock3, RotateCcw, AlertCircle, ArrowUpDown, 
    ChevronLeft, ChevronRight, CalendarDays, Copy
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

// --- COMPONENTE DEL FORMULARIO (MODAL) ---
function ConvocationFormModal({ convocation, onSave, onClose }) {
    // 1. ESTADO DEL FORMULARIO
    const [formData, setFormData] = useState(convocation || {
        title: '', description: '', 
        location: '', locationType: 'presencial', spots: 1, whatsappGroupLink: '',
        startDate: '', endDate: '',
        categorias: [], skills: [],
        requirements: [], benefits: [], 
        tipoHorario: 'recurrente',
        fechaEvento: '', horaInicio: '', horaFin: '',
        horario: {} 
    });

    const [errors, setErrors] = useState({});
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);

    // Auto-Scroll a errores
    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    // Lógica de Chips
    const toggleSelection = (field, item, max) => {
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) { return { ...prev, [field]: list.filter(i => i !== item) }; } 
            else { if (max && list.length >= max) return prev; return { ...prev, [field]: [...list, item] }; }
        });
    };

    // Lógica Horario Recurrente
    const toggleDay = (day) => {
        setFormData(prev => {
            const newHorario = { ...prev.horario };
            if (newHorario[day]) { delete newHorario[day]; } 
            else {
                const existingDay = Object.values(newHorario).find(h => h.start && h.end);
                newHorario[day] = existingDay ? { ...existingDay } : { start: '', end: '' };
            }
            return { ...prev, horario: newHorario };
        });
    };

    const toMinutes = (timeStr) => { if (!timeStr) return -1; const [h, m] = timeStr.split(':').map(Number); return (h * 60) + m; };

    const handleUniqueTimeChange = (field, value) => {
        if (field === 'horaInicio') {
            const newStart = value;
            if (formData.horaFin && toMinutes(newStart) >= toMinutes(formData.horaFin)) { setFormData({ ...formData, horaInicio: newStart, horaFin: '' }); } 
            else { setFormData({ ...formData, horaInicio: newStart }); }
        } else if (field === 'horaFin') {
            const newEnd = value;
            if (formData.horaInicio && toMinutes(newEnd) <= toMinutes(formData.horaInicio)) { alert("⚠️ La hora de fin debe ser posterior a la hora de inicio."); return; }
            setFormData({ ...formData, horaFin: newEnd });
        }
    };

    const handleDayTimeChange = (day, field, value) => {
        setFormData(prev => {
            const currentDay = { ...(prev.horario[day] || { start: '', end: '' }) };
            if (field === 'start') {
                currentDay.start = value;
                if (currentDay.end && toMinutes(value) >= toMinutes(currentDay.end)) { currentDay.end = ''; }
            } else if (field === 'end') {
                if (currentDay.start && toMinutes(value) <= toMinutes(currentDay.start)) { alert("⚠️ La hora de fin debe ser posterior a la hora de inicio."); return prev; }
                currentDay.end = value;
            }
            return { ...prev, horario: { ...prev.horario, [day]: currentDay } };
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "El título es obligatorio.";
        if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria.";
        if (!formData.location.trim()) newErrors.location = "La ubicación es obligatoria.";
        
        if (formData.tipoHorario === 'unico') {
            if (!formData.fechaEvento) newErrors.fecha = "Selecciona una fecha.";
            if (!formData.horaInicio || !formData.horaFin) newErrors.hora = "Define el horario completo.";
        } else {
            if (Object.keys(formData.horario).length === 0) newErrors.horario = "Selecciona al menos un día.";
            if (!formData.startDate || !formData.endDate) newErrors.fechas = "Define el rango de fechas.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return; 

        let descripcionFinal = formData.description || "";
        if (formData.whatsappGroupLink) descripcionFinal += `\n\n🔗 Grupo de WhatsApp: ${formData.whatsappGroupLink}`;

        let fechaInicioEnvio = '', fechaFinEnvio = '';
        if (formData.tipoHorario === 'unico') {
            fechaInicioEnvio = `${formData.fechaEvento}T${formData.horaInicio || '00:00'}`;
            fechaFinEnvio = `${formData.fechaEvento}T${formData.horaFin || '23:59'}`;
        } else {
            fechaInicioEnvio = `${formData.startDate}T00:00`;
            fechaFinEnvio = `${formData.endDate}T23:59`;
        }

        const payloadBackend = {
            titulo: formData.title,
            descripcion: descripcionFinal,
            fecha_inicio: fechaInicioEnvio,
            fecha_fin: fechaFinEnvio,
            cupos_disponibles: parseInt(formData.spots) || 1,
            habilidades_requeridas: (formData.skills || []).join(', '), 
            categorias: formData.categorias || [],
            horario: formData.tipoHorario === 'unico' ? {} : formData.horario,
            estado: 'abierta',
            usuario_creador: 1 
        };
        onSave(payloadBackend);
    };

    const renderChipsSection = (title, field, options, showAll, setShowAll, max) => {
        const visibleOptions = showAll ? options : options.slice(0, 8);
        // 🔥 BLINDAJE: Si formData[field] es undefined, usamos [] para no romper la app
        const currentList = formData[field] || [];
        const selectedCount = currentList.length; 
        
        return (
            <div className="pt-4 border-t border-outline-variant/30">
                <div className="flex justify-between items-baseline mb-2">
                    <label className="block text-label-large text-on-surface font-bold text-primary">{title}</label>
                    <span className={`text-xs font-medium ${max && selectedCount >= max ? 'text-primary' : 'text-on-surface-variant'}`}>({selectedCount}{max ? `/${max}` : ''} seleccionados)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {visibleOptions.map(opt => (
                        <button key={opt} type="button" onClick={() => toggleSelection(field, opt, max)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${currentList.includes(opt) ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary/50'}`}>
                            {currentList.includes(opt) && <Check size={12} />} {opt}
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center isolate" style={{touchAction: 'none'}}>
            <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 animate-fade-in gpu-accelerated" onClick={onClose}></div>
            <div className="relative bg-surface rounded-3xl shadow-elevation-5 w-[90vw] max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up gpu-accelerated">
                <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-outline-variant/30 z-20 shrink-0">
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">{convocation ? (convocation.id ? 'Editar Convocatoria' : 'Replicar Convocatoria') : 'Nueva Convocatoria'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth min-h-[50vh]">
                    <form id="convocation-form" onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div id="field-title"><label className="block text-label-large text-on-surface mb-1.5">Título *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`input-outlined focus:bg-white ${errors.title ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Jornada de Vacunación" />{errors.title && <p className="text-error text-xs mt-1 font-bold flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.title}</p>}</div>
                            <div id="field-description"><label className="block text-label-large text-on-surface mb-1.5">Descripción *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.description ? 'border-error bg-error-container text-error' : ''}`} rows={3} />{errors.description && <p className="text-error text-xs mt-1 font-bold flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.description}</p>}</div>
                        </div>
                        {renderChipsSection("Categoría de la Convocatoria", "categorias", CATEGORIAS_INTERES, showAllCats, setShowAllCats, 3)}
                        {renderChipsSection("Habilidades Requeridas", "skills", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills, null)}
                        <div className="pt-6 border-t border-outline-variant/30" id="field-horario">
                            <label className="block text-label-large text-on-surface mb-3 font-bold text-primary flex items-center gap-2"><Clock3 size={18} /> Disponibilidad Requerida</label>
                            <div className="flex bg-surface-container rounded-lg p-1 mb-4 w-fit">
                                <button type="button" onClick={() => setFormData({...formData, tipoHorario: 'unico'})} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'unico' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Evento Único</button>
                                <button type="button" onClick={() => setFormData({...formData, tipoHorario: 'recurrente'})} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'recurrente' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Recurrente</button>
                            </div>
                            {errors.horario && <p className="text-error text-sm mb-2 font-bold flex items-center"><AlertCircle size={14} className="mr-1"/>{errors.horario}</p>}
                            {formData.tipoHorario === 'unico' ? (
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-3" id="field-fecha"><label className="text-xs font-bold text-primary uppercase tracking-wide mb-1 block">Fecha</label><input type="date" value={formData.fechaEvento} onChange={(e) => setFormData({...formData, fechaEvento: e.target.value})} className={`input-outlined bg-white ${errors.fecha ? 'border-error' : ''}`} /></div>
                                    <div id="field-hora"><TimePickerMD3 label="Hora Inicio" value={formData.horaInicio} onChange={(val) => handleUniqueTimeChange('horaInicio', val)} /></div>
                                    <div><TimePickerMD3 label="Hora Fin" value={formData.horaFin} onChange={(val) => handleUniqueTimeChange('horaFin', val)} /></div>
                                    {errors.hora && <p className="col-span-3 text-error text-xs font-bold text-center">{errors.hora}</p>}
                                </div>
                            ) : (
                                <div className="bg-surface-container/30 rounded-xl border border-outline-variant/50 overflow-hidden divide-y divide-outline-variant/20">
                                    {DIAS_SEMANA.map(dia => {
                                        const isSelected = !!formData.horario[dia];
                                        return (
                                            <div key={dia} className={`p-3 transition-colors ${isSelected ? 'bg-white' : 'hover:bg-white/40'}`}>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                    <div className="flex items-center gap-3 min-w-[120px]">
                                                        <button type="button" onClick={() => toggleDay(dia)} className={`w-10 h-6 rounded-full p-1 transition-colors relative ${isSelected ? 'bg-primary' : 'bg-outline-variant'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isSelected ? 'translate-x-4' : 'translate-x-0'}`} /></button>
                                                        <span className={`text-sm font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>{dia}</span>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="flex items-center gap-2 flex-1 pl-2 animate-fade-in">
                                                            <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Inicio" value={formData.horario[dia].start} onChange={(val) => handleDayTimeChange(dia, 'start', val)} /></div>
                                                            <span className="text-on-surface-variant text-lg font-bold mx-1">:</span>
                                                            <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Fin" value={formData.horario[dia].end} onChange={(val) => handleDayTimeChange(dia, 'end', val)} /></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
                            {formData.tipoHorario === 'recurrente' && (
                                <>
                                    <div id="field-fechas"><label className="block text-label-large text-on-surface mb-1.5">Inicio</label><input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className={`input-outlined focus:bg-white ${errors.fechas ? 'border-error' : ''}`} /></div>
                                    <div><label className="block text-label-large text-on-surface mb-1.5">Cierre</label><input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className={`input-outlined focus:bg-white ${errors.fechas ? 'border-error' : ''}`} /></div>
                                </>
                            )}
                            <div id="field-location"><label className="block text-label-large text-on-surface mb-1.5">Ubicación *</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={`input-outlined focus:bg-white ${errors.location ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Sede Principal" />{errors.location && <p className="text-error text-xs mt-1 font-bold">{errors.location}</p>}</div>
                            <div><label className="block text-label-large text-on-surface mb-1.5">Vacantes</label><input type="number" min="1" value={formData.spots} onChange={(e) => setFormData({ ...formData, spots: e.target.value })} className="input-outlined text-center focus:bg-white" /></div>
                        </div>
                        <div className="pt-2"><label className="block text-label-large text-on-surface mb-1.5">Grupo WhatsApp</label><input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://..." /></div>
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="convocation-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg"><Save className="w-4 h-4" /> Publicar</button>
                </div>
            </div>
        </div>
    );
}

// --- PÁGINA PRINCIPAL ---
export default function AdminConvocationsPage() {
    const {
        getActiveConvocations, getClosedConvocations
    } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConvocation, setEditingConvocation] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); 
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter, sortBy, activeTab]);

    const rawConvocations = activeTab === 'active' ? getActiveConvocations() : getClosedConvocations();

    const filteredConvocations = rawConvocations.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedConvocations = [...filteredConvocations].sort((a, b) => {
        switch (sortBy) {
            case 'newest': return (b.id || 0) - (a.id || 0); 
            case 'oldest': return (a.id || 0) - (b.id || 0);
            case 'alpha': return a.title.localeCompare(b.title);
            case 'event_date': return new Date(a.fecha_inicio || 0) - new Date(b.fecha_inicio || 0);
            default: return 0;
        }
    });

    const totalPages = Math.ceil(sortedConvocations.length / ITEMS_PER_PAGE);
    const paginatedConvocations = sortedConvocations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // 🔥 TRADUCTOR CLAVE: Transforma datos del Backend (Español) a Frontend (Inglés)
    const mapToForm = (convocation) => {
        if (!convocation) return null;
        
        const esRecurrente = convocation.horario && Object.keys(convocation.horario).length > 0;
        let fechaEvento = '', horaInicio = '', horaFin = '';
        let startDate = '', endDate = '';

        if (!esRecurrente && convocation.fecha_inicio) {
            const inicioParts = convocation.fecha_inicio.split('T');
            const finParts = convocation.fecha_fin ? convocation.fecha_fin.split('T') : ['', ''];
            fechaEvento = inicioParts[0];
            horaInicio = inicioParts[1] ? inicioParts[1].substring(0, 5) : '';
            horaFin = finParts[1] ? finParts[1].substring(0, 5) : '';
        } else {
            startDate = convocation.fecha_inicio ? convocation.fecha_inicio.split('T')[0] : '';
            endDate = convocation.fecha_fin ? convocation.fecha_fin.split('T')[0] : '';
        }

        // Manejo seguro de habilidades (si llega como null o vacío)
        const skillsArray = convocation.habilidades_requeridas 
            ? convocation.habilidades_requeridas.split(',').map(s => s.trim()) 
            : [];

        return {
            id: convocation.id,
            title: convocation.titulo,
            // Extraer descripción limpia (quitando añadidos de WhatsApp si existen)
            description: convocation.descripcion ? convocation.descripcion.split('\n\n🔗')[0] : '', 
            location: 'Sede Principal', 
            locationType: 'presencial',
            spots: convocation.cupos_disponibles,
            whatsappGroupLink: '', 
            startDate: startDate,
            endDate: endDate,
            categorias: convocation.categorias || [],
            skills: skillsArray,
            requirements: [], 
            benefits: [], 
            tipoHorario: esRecurrente ? 'recurrente' : 'unico',
            fechaEvento: fechaEvento,
            horaInicio: horaInicio,
            horaFin: horaFin,
            horario: convocation.horario || {} 
        };
    };

    const handleSave = async (data) => {
        try {
            if (editingConvocation && editingConvocation.id) {
                // EDITAR: Usa actualizarConvocatoria (Asegúrate de que tu service lo tenga)
                await actualizarConvocatoria(editingConvocation.id, data);
                alert("✅ Convocatoria actualizada exitosamente");
            } else {
                // CREAR / REPLICAR
                await crearConvocatoria(data);
                alert("✅ Convocatoria creada exitosamente");
            }
            window.location.reload(); 
        } catch (error) {
            console.error("Error:", error);
            const msg = error.error || error.detail || "Error desconocido";
            alert(`❌ Error al guardar: ${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar esta convocatoria?')) {
            try {
                await eliminarConvocatoria(id);
                window.location.reload();
            } catch (error) {
                alert("❌ Error al eliminar");
            }
        }
    };

    const handleStatusChange = async (id, nuevoEstado) => {
        if(!confirm(`¿Cambiar estado a: ${nuevoEstado}?`)) return;
        try {
            await cambiarEstadoConvocatoria(id, nuevoEstado);
            window.location.reload();
        } catch (error) {
            alert("❌ Error al cambiar estado (Verifica que tu Backend tenga el endpoint PATCH)");
        }
    };

    // --- ACCIONES CON TRADUCCIÓN ---
    
    // REPLICAR: Traduce y borra el ID para crear nueva
    const handleReplicate = (convocation) => {
        const formData = mapToForm(convocation);
        if(formData) {
            const replica = {
                ...formData,
                id: null, 
                title: `${formData.title} (Copia)`,
            };
            setEditingConvocation(replica);
            setIsModalOpen(true);
        }
    };

    // EDITAR: Traduce los datos antes de abrir
    const handleEdit = (convocation) => {
        const formData = mapToForm(convocation);
        if(formData) {
            setEditingConvocation(formData);
            setIsModalOpen(true);
        }
    };

    const getStatusBadge = (status) => {
        const styles = { published: 'bg-success-container text-success', paused: 'bg-warning-container text-warning', closed: 'bg-surface-container-high text-on-surface-variant' };
        const labels = { published: 'Publicada', paused: 'Pausada', closed: 'Cerrada' };
        return <span className={`px-3 py-1 rounded-full text-label-small font-medium ${styles[status] || styles.published}`}>{labels[status] || status}</span>;
    };

    return (
        <AdminLayout title="Gestión de Convocatorias" subtitle="Crea, edita y administra las convocatorias.">
            {/* Header Actions & Tabs */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    <button onClick={() => setActiveTab('active')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'active' ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        Activas ({getActiveConvocations().length})
                    </button>
                    <button onClick={() => setActiveTab('history')} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-large transition-all ${activeTab === 'history' ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                        <Archive className="w-4 h-4 inline mr-1" /> Historial ({getClosedConvocations().length})
                    </button>
                </div>
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled hidden sm:flex shadow-primary/20">
                    <Plus className="w-4 h-4" /> Nueva Convocatoria
                </button>
            </div>

            {/* BARRA DE HERRAMIENTAS */}
            <div className="sticky top-0 z-10 bg-surface/95 pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:static sm:bg-transparent border-b border-transparent sm:border-none">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                        <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-outlined pl-10 w-full bg-white/80 focus:bg-white" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {activeTab === 'active' && (
                            <div className="relative min-w-[140px]">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full">
                                    <option value="all">Estado: Todos</option>
                                    <option value="published">Publicadas</option>
                                    <option value="paused">Pausadas</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                            </div>
                        )}
                        <div className="relative min-w-[160px]">
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full">
                                <option value="newest">Más Recientes</option>
                                <option value="oldest">Más Antiguas</option>
                                <option value="event_date">Próx. Evento</option>
                                <option value="alpha">A - Z</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LISTA DE CONVOCATORIAS --- */}
            <div className="space-y-4 pt-2 min-h-[400px]">
                {paginatedConvocations.length === 0 ? (
                    <div className="card text-center py-12 border-2 border-dashed border-outline-variant/50 bg-transparent">
                        <Briefcase className="w-16 h-16 text-on-surface-variant mx-auto mb-4 opacity-50" />
                        <h3 className="text-title-large text-on-surface">No se encontraron resultados</h3>
                        <p className="text-body-medium text-on-surface-variant">Intenta ajustar los filtros de búsqueda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {paginatedConvocations.map(convocation => (
                            <div key={convocation.id} className={`card-elevated animate-fade-in ${activeTab === 'history' ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2 gap-2">
                                            <h3 className="text-title-medium sm:text-title-large font-bold truncate text-primary">{convocation.title}</h3>
                                            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs sm:text-sm font-bold flex items-center shrink-0">
                                                <Users className="w-3 h-3 mr-1"/> {convocation.applicants || 0} / {convocation.spots}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-3">{getStatusBadge(convocation.status)}</div>
                                        <p className="text-body-small sm:text-body-medium text-on-surface-variant mb-3 line-clamp-2">{convocation.description}</p>
                                        <div className="flex flex-wrap gap-3 text-xs sm:text-body-small text-on-surface-variant font-medium">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5"/> Inicio: {convocation.fecha_inicio ? new Date(convocation.fecha_inicio).toLocaleDateString() : 'N/A'}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {convocation.location || 'Virtual'}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40 mt-2 lg:mt-0 justify-center">
                                        {activeTab === 'active' ? (
                                            <>
                                                {/* Botón Editar USA handleEdit */}
                                                <button onClick={() => handleEdit(convocation)} className="btn-tonal py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Edit className="w-4 h-4" /> Editar</button>
                                                
                                                {convocation.status === 'published' ? (
                                                    <button onClick={() => handleStatusChange(convocation.id, 'pausada')} className="btn-outlined border-warning text-warning hover:bg-warning/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Pause className="w-4 h-4" /> Pausar</button>
                                                ) : (
                                                    <button onClick={() => handleStatusChange(convocation.id, 'abierta')} className="btn-outlined border-success text-success hover:bg-success/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Play className="w-4 h-4" /> Publicar</button>
                                                )}
                                                <button onClick={() => handleStatusChange(convocation.id, 'cerrada')} className="btn-outlined py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm hover:bg-surface-container-highest"><Archive className="w-4 h-4" /> Cerrar</button>
                                            </>
                                        ) : (
                                            /* Botón Replicar USA handleReplicate */
                                            <button onClick={() => handleReplicate(convocation)} className="btn-tonal py-2 text-primary font-bold shadow-sm flex-1 lg:w-full justify-center text-sm">
                                                <Copy className="w-4 h-4" /> Replicar
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(convocation.id)} className="btn-outlined border-error text-error hover:bg-error/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Trash2 className="w-4 h-4" /> Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Paginación */}
            {sortedConvocations.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-6 h-6 text-primary" /></button>
                    <span className="text-sm font-medium text-on-surface-variant">Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-6 h-6 text-primary" /></button>
                </div>
            )}

            {/* FAB Móvil sin Blur */}
            <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"><Plus className="w-6 h-6" /></button>

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}