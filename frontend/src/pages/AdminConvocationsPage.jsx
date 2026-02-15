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

// --- FUNCIÓN MAPPER: Convierte datos del Backend al formato del Formulario ---
const mapBackendToForm = (convocation) => {
    if (!convocation) return null;
    
    // Procesar habilidades (string → array o mantener array)
    let skillsArray = [];
    if (convocation.habilidades_requeridas) {
        skillsArray = typeof convocation.habilidades_requeridas === 'string'
            ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean)
            : convocation.habilidades_requeridas;
    }
    
    // Procesar horario para determinar tipo y extraer datos
    const horarioData = convocation.horario || {};
    let tipoHorario = 'unico';
    let fechaEvento = '';
    let horaInicio = '';
    let horaFin = '';
    
    if (horarioData.tipo === 'unico' && horarioData.fecha) {
        tipoHorario = 'unico';
        fechaEvento = horarioData.fecha;
        horaInicio = horarioData.horaInicio || '';
        horaFin = horarioData.horaFin || '';
    } else if (Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
        tipoHorario = 'recurrente';
    }
    
    return {
        title: convocation.titulo || '',
        description: convocation.descripcion || '',
        location: convocation.ubicacion || '',
        locationType: 'presencial',
        spots: convocation.cupos_disponibles || 1,
        whatsappGroupLink: convocation.link_whatsapp || '',
        startDate: convocation.fecha_inicio ? convocation.fecha_inicio.split('T')[0] : '',
        endDate: convocation.fecha_fin ? convocation.fecha_fin.split('T')[0] : '',
        categorias: convocation.categorias || [],
        skills: skillsArray,
        requirements: [],
        benefits: [],
        tipoHorario: tipoHorario,
        fechaEvento: fechaEvento,
        horaInicio: horaInicio,
        horaFin: horaFin,
        horario: horarioData
    };
};

// --- COMPONENTE DEL FORMULARIO (MODAL) ---
function ConvocationFormModal({ convocation, onSave, onClose }) {
    // 1. VALORES POR DEFECTO
    const initialValues = {
        title: '', description: '', 
        location: '', locationType: 'presencial', spots: 1, whatsappGroupLink: '',
        startDate: '', endDate: '',
        categorias: [], skills: [],
        requirements: [], benefits: [], 
        tipoHorario: 'unico', 
        fechaEvento: '', horaInicio: '', horaFin: '',
        horario: {} 
    };

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [matrixErrors, setMatrixErrors] = useState({});
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);

    // 🔥 CARGA DE DATOS: El mapeo ya se hace en handleEdit/handleReplicate
    useEffect(() => {
        console.log('🎨 ===== FORMULARIO: useEffect Ejecutado =====');
        console.log('📦 Convocation prop recibida:', JSON.stringify(convocation, null, 2));
        
        if (convocation) {
            // El convocation ya viene mapeado desde handleEdit/handleReplicate
            // Solo hacemos merge con initialValues
            const mergedData = { ...initialValues, ...convocation };
            console.log('🔀 Datos después del merge:', JSON.stringify(mergedData, null, 2));
            setFormData(mergedData);
        } else {
            console.log('🆕 Modo creación - usando initialValues');
            setFormData(initialValues);
        }
        
        console.log('🎨 ===== FIN useEffect =====');
    }, [convocation]);

    // Auto-Scroll a errores
    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    const toggleSelection = (field, item, max) => {
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) { return { ...prev, [field]: list.filter(i => i !== item) }; } 
            else { if (max && list.length >= max) return prev; return { ...prev, [field]: [...list, item] }; }
        });
    };

    // 🔥 CORRECCIÓN: Inicialización segura de días
    const toggleDay = (day) => {
        setFormData(prev => {
            const newHorario = { ...(prev.horario || {}) };
            
            if (newHorario[day]) { 
                delete newHorario[day];
                setMatrixErrors(e => { const n = {...e}; delete n[day]; return n; });
            } else {
                // BUSCAR MOLDE: Solo copiamos si el día tiene start, end Y es lógicamente válido
                const existingDay = Object.values(newHorario).find(h => 
                    h.start && 
                    h.end && 
                    toMinutes(h.start) < toMinutes(h.end) // <--- ¡AQUÍ ESTÁ EL FILTRO!
                );
                
                newHorario[day] = existingDay 
                    ? { ...existingDay } // Copia el sano
                    : { start: '08:00', end: '12:00' }; // O usa default seguro
            }
            return { ...prev, horario: newHorario };
        });
    };

    const toMinutes = (timeStr) => { 
        if (!timeStr) return -1; 
        const [h, m] = timeStr.split(':').map(Number); 
        return (h * 60) + m; 
    };

    // Validación silenciosa de hora (sin alert)
    const handleUniqueTimeChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            const start = field === 'horaInicio' ? value : prev.horaInicio;
            const end = field === 'horaFin' ? value : prev.horaFin;

            if (start && end && toMinutes(start) >= toMinutes(end)) {
                setErrors(e => ({ ...e, hora: "La hora fin debe ser después del inicio" }));
            } else {
                setErrors(e => { const { hora, ...rest } = e; return rest; });
            }
            return newState;
        });
    };

    // 🔥 CORRECCIÓN: Validación en tiempo real para la matriz recurrente
    // 🔥 CORRECCIÓN: Auto-Limpieza (Borra el valor erróneo inmediatamente)
    const handleDayTimeChange = (day, field, value) => {
        setFormData(prev => {
            const currentDay = { ...(prev.horario[day] || { start: '', end: '' }) };
            let errorMsg = null;

            if (field === 'start') {
                currentDay.start = value;
                // Si movemos inicio después del fin actual -> Borramos fin
                if (currentDay.end && toMinutes(value) >= toMinutes(currentDay.end)) {
                    currentDay.end = ''; 
                    errorMsg = "Ajusta la hora de cierre";
                }
            } else if (field === 'end') {
                // Si intentamos poner un fin absurdo -> BORRAMOS EL VALOR
                if (currentDay.start && toMinutes(value) <= toMinutes(currentDay.start)) {
                    currentDay.end = ''; // <--- LIMPIEZA INMEDIATA
                    errorMsg = "La hora de cierre debe ser posterior";
                } else {
                    currentDay.end = value;
                }
            }
            
            // Actualizamos el error visual
            setMatrixErrors(prevErrors => ({ 
                ...prevErrors, 
                // Si el usuario corrige (pone un valor válido), borramos el mensaje de error
                [day]: (!errorMsg && field === 'end') ? null : errorMsg 
            }));

            return { ...prev, horario: { ...prev.horario, [day]: currentDay } };
        });
    };

    // 🔥 VALIDACIÓN DE FECHAS (Calendario)
    const handleDateChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            
            const start = field === 'startDate' ? value : prev.startDate;
            const end = field === 'endDate' ? value : prev.endDate;

            // Limpiamos error previo de fechas si el usuario intenta corregir
            setErrors(e => { const n = {...e}; delete n.fechas; return n; });

            if (start && end) {
                const startDate = new Date(start);
                const endDate = new Date(end);

                if (endDate < startDate) {
                    if (field === 'endDate') {
                        // CASO 1: Intenta poner fin antes de inicio -> BLOQUEAMOS
                        setErrors(e => ({ ...e, fechas: "La fecha de cierre debe ser posterior al inicio" }));
                        return prev; // No actualizamos el estado (Bloqueo)
                    }
                    if (field === 'startDate') {
                        // CASO 2: Mueve inicio después de fin -> BORRAMOS FIN
                        newState.endDate = ''; 
                        setErrors(e => ({ ...e, fechas: "Ajusta la fecha de cierre" }));
                    }
                }
            }
            return newState;
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title?.trim()) newErrors.title = "El título es obligatorio.";
        if (!formData.description?.trim()) newErrors.description = "La descripción es obligatoria.";
        if (!formData.location?.trim()) newErrors.location = "La ubicación es obligatoria.";
        
        if (formData.tipoHorario === 'unico') {
            if (!formData.fechaEvento) newErrors.fecha = "Selecciona una fecha.";
            if (!formData.horaInicio || !formData.horaFin) newErrors.hora = "Define el horario completo.";
            if (formData.horaInicio && formData.horaFin && toMinutes(formData.horaInicio) >= toMinutes(formData.horaFin)) {
                newErrors.hora = "Hora fin inválida.";
            }
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

        // 1. FORMATO DE FECHAS (con segundos para Django)
        let startDate = '', endDate = '';
        if (formData.tipoHorario === 'unico') {
             startDate = `${formData.fechaEvento}T${formData.horaInicio || '00:00'}:00`;
             endDate = `${formData.fechaEvento}T${formData.horaFin || '23:59'}:00`;
        } else {
             startDate = `${formData.startDate}T00:00:00`;
             endDate = `${formData.endDate}T23:59:59`;
        }

        // 🔥 CORRECCIÓN CLAVE: Enviamos un objeto con las claves en INGLÉS
        // Esto es lo que 'convocatoriaService.js' espera recibir en 'formData' para hacer su trabajo.
        
        // Construir el objeto horario según el tipo seleccionado
        let horarioFinal = {};
        if (formData.tipoHorario === 'unico') {
            horarioFinal = {
                tipo: 'unico',
                fecha: formData.fechaEvento,
                horaInicio: formData.horaInicio,
                horaFin: formData.horaFin
            };
        } else {
            // Para horario recurrente, incluimos el tipo y los días con horarios
            horarioFinal = { 
                tipo: 'recurrente',
                ...formData.horario 
            };
        }
        
        const payloadForService = {
            title: formData.title,
            description: formData.description,
            location: formData.location,           // ✅ ¡Ahora sí se envía!
            whatsappGroupLink: formData.whatsappGroupLink, // ✅ ¡Ahora sí se envía!
            startDate: startDate,
            endDate: endDate,
            spots: parseInt(formData.spots) || 1,
            skills: formData.skills || [],
            categorias: formData.categorias || [],
            horario: horarioFinal,  // ✅ Horario estructurado correctamente
            requirements: formData.requirements || [],
            benefits: formData.benefits || []
        };
        
        onSave(payloadForService);
    };

    const renderChipsSection = (title, field, options, showAll, setShowAll, max) => {
        const visibleOptions = showAll ? options : options.slice(0, 8);
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
                    <h2 className="text-title-large text-on-surface font-bold tracking-tight">{convocation && convocation.id ? 'Editar Convocatoria' : convocation ? 'Replicar Convocatoria' : 'Nueva Convocatoria'}</h2>
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
                                    
                                    {/* 🔥 ESTILO ACTUALIZADO: Evento Único (Con ícono y fondo) */}
                                    {errors.hora && (
                                        <div className="col-span-3 bg-error/5 border border-error/20 rounded-lg p-2 flex items-center justify-center animate-fade-in">
                                            <AlertCircle size={14} className="text-error mr-2" />
                                            <span className="text-error text-xs font-bold">{errors.hora}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-surface-container/30 rounded-xl border border-outline-variant/50 overflow-hidden divide-y divide-outline-variant/20">
                                    {DIAS_SEMANA.map(dia => {
                                        const isSelected = !!formData.horario[dia];
                                        const dayError = matrixErrors[dia];

                                        return (
                                            <div key={dia} className={`p-3 transition-colors ${isSelected ? 'bg-white' : 'hover:bg-white/40'}`}>
                                                {/* 🔥 ALINEACIÓN: 'sm:items-center' asegura que el Toggle esté CENTRADO verticalmente */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                    <div className="flex items-center gap-3 min-w-[120px]">
                                                        <button type="button" onClick={() => toggleDay(dia)} className={`w-10 h-6 rounded-full p-1 transition-colors relative ${isSelected ? 'bg-primary' : 'bg-outline-variant'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isSelected ? 'translate-x-4' : 'translate-x-0'}`} /></button>
                                                        <span className={`text-sm font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>{dia}</span>
                                                    </div>
                                                    
                                                    {isSelected && (
                                                        <div className="flex-1 animate-fade-in">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Inicio" value={formData.horario[dia].start} onChange={(val) => handleDayTimeChange(dia, 'start', val)} /></div>
                                                                <span className="text-on-surface-variant text-lg font-bold mx-1">:</span>
                                                                <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Fin" value={formData.horario[dia].end} onChange={(val) => handleDayTimeChange(dia, 'end', val)} /></div>
                                                            </div>
                                                            
                                                            {/* 🔥 ESTILO ACTUALIZADO: Matriz (Con ícono, fondo y bordes circulares) */}
                                                            {dayError && (
                                                                <div className="mt-2 bg-error/5 border border-error/20 rounded-lg p-1.5 flex items-center justify-start animate-fade-in">
                                                                    <AlertCircle size={12} className="text-error mr-1.5 ml-1" />
                                                                    <span className="text-error text-xs font-bold">{dayError}</span>
                                                                </div>
                                                            )}
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
                                    <div id="field-fechas">
                                        <label className="block text-label-large text-on-surface mb-1.5">Inicio</label>
                                        <input 
                                            type="date" 
                                            value={formData.startDate} 
                                            onChange={(e) => handleDateChange('startDate', e.target.value)} 
                                            className={`input-outlined focus:bg-white ${errors.fechas ? 'border-error text-error' : ''}`} 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-label-large text-on-surface mb-1.5">Cierre</label>
                                        <input 
                                            type="date" 
                                            value={formData.endDate} 
                                            onChange={(e) => handleDateChange('endDate', e.target.value)} 
                                            className={`input-outlined focus:bg-white ${errors.fechas ? 'border-error text-error' : ''}`} 
                                        />
                                    </div>
                                    
                                    {/* 🔥 1. ESTILO CORREGIDO: Igual al de la matriz (Borde, fondo, ícono, centrado) */}
                                    {errors.fechas && (
                                        <div className="col-span-1 md:col-span-2 bg-error/5 border border-error/20 rounded-lg p-2 flex items-center justify-center animate-fade-in">
                                            <AlertCircle size={14} className="text-error mr-2" />
                                            <span className="text-error text-xs font-bold">{errors.fechas}</span>
                                        </div>
                                    )}
                                </>
                            )}

                            <div id="field-location">
                                <label className="block text-label-large text-on-surface mb-1.5">Ubicación *</label>
                                <input 
                                    type="text" 
                                    value={formData.location} 
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                                    className={`input-outlined focus:bg-white ${errors.location ? 'border-error bg-error-container text-error' : ''}`} 
                                    placeholder="Ej: Sede Principal" 
                                />
                                {/* 🔥 2. ICONO AGREGADO: AlertCircle en error de ubicación */}
                                {errors.location && (
                                    <p className="text-error text-xs mt-1 font-bold flex items-center animate-fade-in">
                                        <AlertCircle size={12} className="mr-1"/> {errors.location}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-label-large text-on-surface mb-1.5">Vacantes</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={formData.spots} 
                                    onChange={(e) => setFormData({ ...formData, spots: e.target.value })} 
                                    className="input-outlined text-center focus:bg-white" 
                                />
                            </div>
                        </div>
                        <div className="pt-2"><label className="block text-label-large text-on-surface mb-1.5">Grupo WhatsApp (Solo visible para aprobados)</label><input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://..." /></div>
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
    const { getActiveConvocations, getClosedConvocations } = useApp();

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
        const matchesSearch = (c.title || c.titulo || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter || c.estado === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedConvocations = [...filteredConvocations].sort((a, b) => {
        const dateA = new Date(a.fecha_inicio || a.startDate || 0);
        const dateB = new Date(b.fecha_inicio || b.startDate || 0);
        const idA = a.id || 0;
        const idB = b.id || 0;
        const titleA = a.title || a.titulo || '';
        const titleB = b.title || b.titulo || '';

        switch (sortBy) {
            case 'newest': return idB - idA; 
            case 'oldest': return idA - idB;
            case 'alpha': return titleA.localeCompare(titleB);
            case 'event_date': return dateA - dateB;
            default: return 0;
        }
    });

    const totalPages = Math.ceil(sortedConvocations.length / ITEMS_PER_PAGE);
    const paginatedConvocations = sortedConvocations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // 🔥 TRADUCTOR FORENSE (Recarga datos al Editar) - VERSIÓN MEJORADA
    const mapToForm = (convocation) => {
        if (!convocation) return null;
        
        console.log('🔍 ===== MAPEO INICIADO =====');
        console.log('📦 Convocatoria recibida:', JSON.stringify(convocation, null, 2));
        
        // 1. Datos básicos (Backend ESP -> Frontend ENG)
        const titulo = convocation.title || convocation.titulo || '';
        const descripcion = convocation.description || convocation.descripcion || '';
        const cupos = convocation.spots || convocation.cupos_disponibles || 1;
        
        // 🔥 MAPEO DIRECTO DE CAMPOS NUEVOS
        const ubicacion = convocation.ubicacion || convocation.location || '';
        const whatsapp = convocation.link_whatsapp || convocation.whatsappGroupLink || '';
        
        // 2. Procesar horario
        const horarioData = convocation.horario || {};
        let tipoHorario = 'unico';
        let fechaEvento = '';
        let horaInicio = '';
        let horaFin = '';
        let startDate = '';
        let endDate = '';
        
        // Determinar si es horario único o recurrente
        if (horarioData.tipo === 'unico' && horarioData.fecha) {
            // Horario único: los datos están en el objeto horario
            tipoHorario = 'unico';
            fechaEvento = horarioData.fecha;
            horaInicio = horarioData.horaInicio || '';
            horaFin = horarioData.horaFin || '';
        } else if (Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
            // Horario recurrente: hay días de la semana en el objeto
            tipoHorario = 'recurrente';
            const rawInicio = convocation.fecha_inicio || convocation.startDate || '';
            const rawFin = convocation.fecha_fin || convocation.endDate || '';
            startDate = rawInicio ? rawInicio.split('T')[0] : '';
            endDate = rawFin ? rawFin.split('T')[0] : '';
        } else {
            // Fallback: intentar extraer de fecha_inicio/fecha_fin
            const rawInicio = convocation.fecha_inicio || convocation.startDate || '';
            const rawFin = convocation.fecha_fin || convocation.endDate || '';
            
            if (rawInicio && rawInicio.includes('T')) {
                const parts = rawInicio.split('T');
                fechaEvento = parts[0];
                horaInicio = parts[1]?.substring(0, 5) || '';
            }
            if (rawFin && rawFin.includes('T')) {
                const parts = rawFin.split('T');
                horaFin = parts[1]?.substring(0, 5) || '';
            }
        }

        // 3. Arrays
        let skillsArray = [];
        if (Array.isArray(convocation.skills)) {
            skillsArray = convocation.skills;
        } else if (convocation.habilidades_requeridas) {
            skillsArray = typeof convocation.habilidades_requeridas === 'string'
                ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean)
                : convocation.habilidades_requeridas;
        }

        const result = {
            id: convocation.id,
            title: titulo,
            description: descripcion,
            location: ubicacion, // ✅ Mapeado
            whatsappGroupLink: whatsapp, // ✅ Mapeado
            spots: cupos, // ✅ Corregido
            startDate,
            endDate,
            categorias: convocation.categorias || [],
            skills: skillsArray,
            requirements: [], 
            benefits: [], 
            tipoHorario: tipoHorario,
            fechaEvento,
            horaInicio,
            horaFin,
            horario: horarioData
        };
        
        console.log('✅ Datos mapeados:', JSON.stringify(result, null, 2));
        console.log('🔍 ===== FIN MAPEO =====');
        
        return result;
    };

    // 🔥 MANEJO DE ERRORES DETALLADO
    const handleSave = async (data) => {
        try {
            if (editingConvocation && editingConvocation.id) {
                await actualizarConvocatoria(editingConvocation.id, data);
                alert("✅ Actualizado correctamente");
            } else {
                await crearConvocatoria(data);
                alert("✅ Creado correctamente");
            }
            window.location.reload(); 
        } catch (error) {
            console.error("Error completo:", error);
            
            let msg = "Error desconocido";
            if (error.response && error.response.data) {
                const data = error.response.data;
                if (data.error) msg = data.error;
                else if (data.detail) msg = data.detail;
                // Si el backend devuelve un objeto de errores {campo: [error]}
                else {
                    msg = Object.entries(data)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join('\n');
                }
            } else if (error.message) {
                msg = error.message;
            }
            
            alert(`❌ No se pudo guardar:\n${msg}`);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Eliminar esta convocatoria?')) {
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
            alert("❌ Error al cambiar estado.");
        }
    };

    const handleReplicate = (convocation) => {
        const formData = mapToForm(convocation);
        if(formData) {
            const replica = { ...formData, id: null, title: `${formData.title} (Copia)` };
            setEditingConvocation(replica);
            setIsModalOpen(true);
        }
    };

    const handleEdit = (convocation) => {
        console.log('✏️ ===== EDITANDO CONVOCATORIA =====');
        console.log('📥 Convocatoria entrante:', JSON.stringify(convocation, null, 2));
        
        const formData = mapToForm(convocation);
        
        console.log('📝 FormData después de mapeo:', JSON.stringify(formData, null, 2));
        
        if(formData) {
            setEditingConvocation(formData);
            console.log('✅ EditingConvocation establecido, abriendo modal');
            setIsModalOpen(true);
        } else {
            console.error('❌ mapToForm devolvió null o undefined');
        }
    };

    const getStatusBadge = (status) => {
        let normalized = 'closed';
        if (status === 'abierta' || status === 'published' || status === 'active') normalized = 'published';
        if (status === 'pausada' || status === 'paused') normalized = 'paused';
        
        const styles = { 
            published: 'bg-success-container text-success', 
            paused: 'bg-warning-container text-warning', 
            closed: 'bg-surface-container-high text-on-surface-variant' 
        };
        const labels = { published: 'Publicada', paused: 'Pausada', closed: 'Cerrada' };
        
        return <span className={`px-3 py-1 rounded-full text-label-small font-medium ${styles[normalized]}`}>{labels[normalized]}</span>;
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
                                    <option value="abierta">Abiertas</option>
                                    <option value="pausada">Pausadas</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                            </div>
                        )}
                        <div className="relative min-w-[160px]">
                            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-outlined pl-9 pr-8 appearance-none bg-white/80 focus:bg-white text-sm h-full">
                                <option value="newest">Más Recientes</option>
                                <option value="oldest">Más Antiguas</option>
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
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {paginatedConvocations.map(convocation => {
                            const isPublished = convocation.estado === 'abierta' || convocation.status === 'published';
                            
                            return (
                                <div key={convocation.id} className={`card-elevated animate-fade-in ${activeTab === 'history' ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2 gap-2">
                                                <h3 className="text-title-medium sm:text-title-large font-bold truncate text-primary">{convocation.title || convocation.titulo}</h3>
                                                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs sm:text-sm font-bold flex items-center shrink-0">
                                                    <Users className="w-3 h-3 mr-1"/> {convocation.applicants || 0} / {convocation.spots || convocation.cupos_disponibles}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 mb-3">{getStatusBadge(convocation.estado || convocation.status)}</div>
                                            <p className="text-body-small sm:text-body-medium text-on-surface-variant mb-3 line-clamp-2">{convocation.description || convocation.descripcion}</p>
                                            <div className="flex flex-wrap gap-3 text-xs sm:text-body-small text-on-surface-variant font-medium">
                                                <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5"/> Inicio: {new Date(convocation.fecha_inicio || convocation.startDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {convocation.location || convocation.ubicacion || 'Sede Principal'}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap lg:flex-col gap-2 lg:w-40 mt-2 lg:mt-0 justify-center">
                                            {activeTab === 'active' ? (
                                                <>
                                                    <button onClick={() => handleEdit(convocation)} className="btn-tonal py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Edit className="w-4 h-4" /> Editar</button>
                                                    
                                                    {isPublished ? (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'pausada')} className="btn-outlined border-warning text-warning hover:bg-warning/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Pause className="w-4 h-4" /> Pausar</button>
                                                    ) : (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'abierta')} className="btn-outlined border-success text-success hover:bg-success/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Play className="w-4 h-4" /> Publicar</button>
                                                    )}
                                                    
                                                    <button onClick={() => handleStatusChange(convocation.id, 'cerrada')} className="btn-outlined py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm hover:bg-surface-container-highest"><Archive className="w-4 h-4" /> Cerrar</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleReplicate(convocation)} className="btn-tonal py-2 text-primary font-bold shadow-sm flex-1 lg:w-full justify-center text-sm"><Copy className="w-4 h-4" /> Replicar</button>
                                            )}
                                            <button onClick={() => handleDelete(convocation.id)} className="btn-outlined border-error text-error hover:bg-error/10 py-2 sm:py-2.5 flex-1 lg:w-full justify-center text-sm"><Trash2 className="w-4 h-4" /> Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {sortedConvocations.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-6 h-6 text-primary" /></button>
                    <span className="text-sm font-medium text-on-surface-variant">Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-6 h-6 text-primary" /></button>
                </div>
            )}

            <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"><Plus className="w-6 h-6" /></button>

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </AdminLayout>
    );
}