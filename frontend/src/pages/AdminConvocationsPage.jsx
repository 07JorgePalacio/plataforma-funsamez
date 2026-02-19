import { useState, useEffect } from 'react';
import { 
    crearConvocatoria, actualizarConvocatoria, cambiarEstadoConvocatoria, eliminarConvocatoria 
} from '../services/convocatoriaService';
import { useApp } from '../context/AppContext';
import AdminLayout from '../components/AdminLayout';
import TimePickerMD3 from '../components/TimePickerMD3';
import Snackbar from '../components/Snackbar';
import ConfirmDialog from '../components/ConfirmDialog'; // 🟢 NUEVO
import {
    Plus, Edit, Trash2, X, Save, MapPin, Users,
    Briefcase, Pause, Play, Archive, Search, Filter, ChevronDown, 
    Check, ChevronUp, Clock3, AlertCircle, ArrowUpDown, 
    ChevronLeft, ChevronRight, Copy, Inbox, Video, Laptop, Home
} from 'lucide-react';

const CATEGORIAS_INTERES = ["Salud", "Capacitación / Cursos", "Estética y Belleza", "Educación Infantil", "Medio Ambiente", "Adulto Mayor", "Salud y Bienestar", "Tecnología Social", "Arte y Cultura", "Logística de Eventos", "Deportes y Recreación", "Atención Psicosocial", "Nutrición y Cocina", "Construcción y Vivienda", "Rescate Animal"];
const HABILIDADES_OPCIONES = ["Sin Experiencia Previa", "Disponibilidad de Tiempo", "Liderazgo", "Trabajo en Equipo", "Comunicación Asertiva", "Inglés Básico", "Inglés Avanzado", "Excel / Office", "Diseño Gráfico", "Programación / IT", "Primeros Auxilios", "Fotografía y Video", "Redacción", "Manejo de Redes Sociales", "Contabilidad Básica", "Enseñanza / Pedagogía", "Conducción", "Cocina", "Manualidades"];
const BENEFICIOS_OPCIONES = ["Certificado de Curso/Diplomado", "Materiales Incluidos", "Certificado de Voluntariado", "Refrigerio / Alimentación", "Transporte", "Camiseta / Uniforme", "Capacitación Certificada", "Experiencia Laboral", "Red de Contactos", "Bonificación", "Créditos Académicos", "Seguro de Accidentes"];
const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const mapBackendToForm = (convocation) => {
    if (!convocation) return null;
    let skillsArray = [];
    if (convocation.habilidades_requeridas) {
        skillsArray = typeof convocation.habilidades_requeridas === 'string' ? convocation.habilidades_requeridas.split(',').map(s => s.trim()).filter(Boolean) : convocation.habilidades_requeridas;
    }
    const horarioData = convocation.horario || {};
    let tipoHorario = 'unico', fechaEvento = '', horaInicio = '', horaFin = '', horarioMatrix = {};
    
    if (horarioData.tipo === 'unico') {
        tipoHorario = 'unico'; fechaEvento = horarioData.fecha || ''; horaInicio = horarioData.horaInicio || ''; horaFin = horarioData.horaFin || '';
    } else if (horarioData.tipo === 'recurrente' || Object.keys(horarioData).some(key => DIAS_SEMANA.includes(key))) {
        tipoHorario = 'recurrente';
        DIAS_SEMANA.forEach(dia => { if (horarioData[dia]) horarioMatrix[dia] = horarioData[dia]; });
    }
    return {
        id: convocation.id, title: convocation.titulo || '', description: convocation.descripcion || '', location: convocation.ubicacion || '',
        whatsappGroupLink: convocation.link_whatsapp || '', modalidad: convocation.modalidad ? convocation.modalidad.toLowerCase() : 'presencial', spots: convocation.cupos_disponibles || 1,
        startDate: tipoHorario === 'recurrente' && convocation.fecha_inicio ? convocation.fecha_inicio.split('T')[0] : '',
        endDate: tipoHorario === 'recurrente' && convocation.fecha_fin ? convocation.fecha_fin.split('T')[0] : '',
        categorias: convocation.categorias || [], skills: skillsArray, beneficios: convocation.beneficios || [], 
        tipoHorario, fechaEvento, horaInicio, horaFin, horario: horarioMatrix
    };
};

function ConvocationFormModal({ convocation, onSave, onClose }) {
    const initialValues = { title: '', description: '', location: '', whatsappGroupLink: '', modalidad: 'presencial', spots: 1, startDate: '', endDate: '', categorias: [], skills: [], beneficios: [], tipoHorario: 'unico', fechaEvento: '', horaInicio: '', horaFin: '', horario: {} };
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [matrixErrors, setMatrixErrors] = useState({});
    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllBenefits, setShowAllBenefits] = useState(false);

    useEffect(() => {
        if (convocation) setFormData({ ...initialValues, ...convocation });
        else setFormData(initialValues);
    }, [convocation]);

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const element = document.getElementById(`field-${errorKeys[0]}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [errors]);

    const handleTipoHorarioChange = (tipo) => {
        if (tipo === formData.tipoHorario) return;
        setFormData({ ...formData, tipoHorario: tipo });
        setErrors(prev => { 
            const newErrors = {...prev}; 
            if (tipo === 'recurrente') { delete newErrors.fecha; delete newErrors.hora; } 
            else { delete newErrors.startDate; delete newErrors.endDate; delete newErrors.horario; }
            return newErrors; 
        });
    };

    const toggleSelection = (field, item, max) => {
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(item)) return { ...prev, [field]: list.filter(i => i !== item) };
            if (max && list.length >= max) return prev;
            return { ...prev, [field]: [...list, item] };
        });
    };

    const toMinutes = (timeStr) => { if (!timeStr) return -1; const [h, m] = timeStr.split(':').map(Number); return (h * 60) + m; };
    const findTemplateDay = (currentSchedule) => Object.values(currentSchedule).find(day => day.start && day.end && toMinutes(day.end) > toMinutes(day.start));

    const toggleDay = (day) => {
        setFormData(prev => {
            const newHorario = { ...(prev.horario || {}) };
            if (newHorario[day]) { delete newHorario[day]; setMatrixErrors(prevE => { const n = {...prevE}; delete n[day]; return n; }); } 
            else { const template = findTemplateDay(newHorario); newHorario[day] = template ? { ...template } : { start: '08:00', end: '12:00' }; }
            return { ...prev, horario: newHorario };
        });
    };

    const handleDayTimeChange = (day, field, value) => {
        const currentDay = { ...(formData.horario[day] || { start: '', end: '' }) };
        currentDay[field] = value;
        let errorMsg = null;
        if (currentDay.start && currentDay.end && toMinutes(currentDay.end) <= toMinutes(currentDay.start)) { errorMsg = "La hora final debe ser posterior."; currentDay.end = ''; }
        setMatrixErrors(prev => { const newErrs = { ...prev }; if (errorMsg) newErrs[day] = errorMsg; else delete newErrs[day]; return newErrs; });
        setFormData(prev => ({ ...prev, horario: { ...prev.horario, [day]: currentDay } }));
    };

    const handleUniqueTimeChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            const start = field === 'horaInicio' ? value : prev.horaInicio;
            const end = field === 'horaFin' ? value : prev.horaFin;
            if (start && end && toMinutes(start) >= toMinutes(end)) setErrors(e => ({ ...e, hora: "La hora fin debe ser después del inicio" }));
            else setErrors(e => { const { hora, ...rest } = e; return rest; });
            return newState;
        });
    };

    const handleUniqueDateChange = (value) => {
        setFormData({ ...formData, fechaEvento: value });
        setErrors(prev => { const n = {...prev}; delete n.fecha; return n; });
        const today = new Date().toISOString().split('T')[0];
        if (!convocation?.id && value < today) setErrors(prev => ({...prev, fecha: "No puede ser en el pasado."}));
    };

    const handleDateChange = (field, value) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        setErrors(prev => { const newErrors = { ...prev }; delete newErrors[field]; return newErrors; });
        const hoy = new Date().toISOString().split('T')[0];
        const start = field === 'startDate' ? value : formData.startDate;
        const end = field === 'endDate' ? value : formData.endDate;
        if (field === 'startDate' && !convocation?.id && value < hoy) setErrors(prev => ({...prev, startDate: "No puede iniciar en el pasado."}));
        if (start && end && end < start) setErrors(prev => ({...prev, endDate: "El cierre debe ser posterior al inicio."}));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title?.trim()) newErrors.title = "El título es obligatorio.";
        if (!formData.description?.trim()) newErrors.description = "La descripción es obligatoria.";
        if (!formData.location?.trim()) newErrors.location = formData.modalidad === 'virtual' ? "El enlace es obligatorio." : "La dirección es obligatoria.";
        
        if (formData.tipoHorario === 'unico') {
            if (!formData.fechaEvento) newErrors.fecha = "Selecciona una fecha.";
            if (!formData.horaInicio || !formData.horaFin) newErrors.hora = "Define el horario completo.";
            if (errors.hora) newErrors.hora = errors.hora; 
            if (errors.fecha) newErrors.fecha = errors.fecha; 
        } else {
            if (Object.keys(formData.horario).length === 0) newErrors.horario = "Selecciona al menos un día.";
            if (Object.keys(matrixErrors).length > 0) newErrors.horario = "Corrige los errores en los horarios.";
            if (!formData.startDate) newErrors.startDate = "Define fecha de inicio.";
            if (!formData.endDate) newErrors.endDate = "Define fecha de cierre.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        let startDate = '', endDate = '', horarioFinal = {};
        if (formData.tipoHorario === 'unico') {
             startDate = `${formData.fechaEvento}T${formData.horaInicio || '00:00'}:00`;
             endDate = `${formData.fechaEvento}T${formData.horaFin || '23:59'}:00`;
             horarioFinal = { tipo: 'unico', fecha: formData.fechaEvento, horaInicio: formData.horaInicio, horaFin: formData.horaFin };
        } else {
             startDate = `${formData.startDate}T00:00:00`;
             endDate = `${formData.endDate}T23:59:59`;
             horarioFinal = { tipo: 'recurrente', ...formData.horario };
        }
        const payload = {
            title: formData.title, description: formData.description, location: formData.location, whatsappGroupLink: formData.whatsappGroupLink,
            modalidad: formData.modalidad, startDate, endDate, spots: parseInt(formData.spots) || 1, skills: formData.skills || [],
            categorias: formData.categorias || [], beneficios: formData.beneficios || [], horario: horarioFinal
        };
        onSave(payload);
    };

    const renderChipsSection = (title, field, options, showAll, setShowAll, max) => (
        <div className="pt-4 border-t border-outline-variant/30">
            <div className="flex justify-between items-baseline mb-2">
                <label className="block text-label-large text-on-surface font-bold text-primary">{title}</label>
                <span className={`text-xs font-medium ${max && formData[field].length >= max ? 'text-primary' : 'text-on-surface-variant'}`}>({formData[field].length}{max ? `/${max}` : ''})</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {(showAll ? options : options.slice(0, 8)).map(opt => (
                    <button key={opt} type="button" onClick={() => toggleSelection(field, opt, max)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1 ${formData[field].includes(opt) ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant hover:border-primary/50'}`}>
                        {formData[field].includes(opt) && <Check size={12}/>} {opt}
                    </button>
                ))}
            </div>
            {options.length > 8 && <button type="button" onClick={() => setShowAll(!showAll)} className="mt-2 text-xs text-primary font-bold flex items-center hover:underline">
                {showAll ? <><ChevronUp size={14} className="mr-1"/> Ver menos</> : <><ChevronDown size={14} className="mr-1"/> Ver más ({options.length - 8} restantes)</>}
            </button>}
        </div>
    );

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
                            <div id="field-title"><label className="block text-label-large text-on-surface mb-1.5">Título *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`input-outlined focus:bg-white ${errors.title ? 'border-error bg-error-container text-error' : ''}`} placeholder="Ej: Jornada de Salud Oral" />{errors.title && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.title}</p>}</div>
                            <div id="field-description"><label className="block text-label-large text-on-surface mb-1.5">Descripción *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`input-outlined resize-none focus:bg-white ${errors.description ? 'border-error bg-error-container text-error' : ''}`} rows={3} />{errors.description && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.description}</p>}</div>
                        </div>
                        
                        {renderChipsSection("Categoría / Tipo de Oportunidad", "categorias", CATEGORIAS_INTERES, showAllCats, setShowAllCats, 3)}
                        {renderChipsSection("Requisitos / Habilidades", "skills", HABILIDADES_OPCIONES, showAllSkills, setShowAllSkills, null)}
                        {renderChipsSection("Beneficios Ofrecidos", "beneficios", BENEFICIOS_OPCIONES, showAllBenefits, setShowAllBenefits, null)}

                        <div className="pt-4 border-t border-outline-variant/30 space-y-4">
                            <div>
                                <label className="block text-label-large text-on-surface mb-2 font-bold">Modalidad</label>
                                <div className="flex bg-surface-container rounded-lg p-1 w-full">
                                    <button type="button" onClick={() => setFormData({...formData, modalidad: 'presencial'})} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex justify-center items-center gap-2 ${formData.modalidad === 'presencial' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}>
                                        <Home size={18} /> Presencial
                                    </button>
                                    <button type="button" onClick={() => setFormData({...formData, modalidad: 'virtual'})} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all flex justify-center items-center gap-2 ${formData.modalidad === 'virtual' ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}>
                                        <Video size={18} /> Virtual
                                    </button>
                                </div>
                            </div>

                            <div id="field-location">
                                <label className="block text-label-large text-on-surface mb-2 font-bold">
                                    {formData.modalidad === 'presencial' ? 'Dirección del Evento *' : 'Enlace de Reunión (Meet/Zoom/Teams) *'}
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                                        {formData.modalidad === 'presencial' ? <MapPin size={20} /> : <Laptop size={20} />}
                                    </div>
                                    <input 
                                        type={formData.modalidad === 'virtual' ? 'url' : 'text'}
                                        value={formData.location} 
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                                        className={`input-outlined pl-10 w-full focus:bg-white ${errors.location ? 'border-error bg-error-container text-error' : ''}`} 
                                        placeholder={formData.modalidad === 'presencial' ? "Ej: Calle 10 # 5-20, Barrio Comuneros" : "Ej: https://meet.google.com/abc-xyz-123"} 
                                    />
                                </div>
                                {errors.location && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.location}</p>}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-outline-variant/30" id="field-horario">
                            <label className="block text-label-large text-on-surface mb-3 font-bold text-primary flex items-center gap-2"><Clock3 size={18} /> Disponibilidad Requerida</label>
                            
                            <div className="flex bg-surface-container rounded-lg p-1 mb-4 w-fit">
                                <button type="button" onClick={() => handleTipoHorarioChange('unico')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'unico' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Evento Único</button>
                                <button type="button" onClick={() => handleTipoHorarioChange('recurrente')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${formData.tipoHorario === 'recurrente' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Recurrente</button>
                            </div>
                            
                            {errors.horario && <p className="text-error text-sm mb-2 font-bold flex items-center animate-pulse"><AlertCircle size={14} className="mr-1"/>{errors.horario}</p>}
                            
                            {formData.tipoHorario === 'unico' ? (
                                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-3" id="field-fecha">
                                        <label className="text-xs font-bold text-primary uppercase tracking-wide mb-1 block">Fecha</label>
                                        <input type="date" value={formData.fechaEvento} onChange={(e) => handleUniqueDateChange(e.target.value)} className={`input-outlined bg-white ${errors.fecha ? 'border-error' : ''}`} />
                                        {errors.fecha && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.fecha}</p>}
                                    </div>
                                    <div id="field-hora"><TimePickerMD3 label="Inicio" value={formData.horaInicio} onChange={(val) => handleUniqueTimeChange('horaInicio', val)} /></div>
                                    <div><TimePickerMD3 label="Fin" value={formData.horaFin} onChange={(val) => handleUniqueTimeChange('horaFin', val)} /></div>
                                    
                                    {errors.hora && (
                                        <div className="col-span-3 bg-error/10 text-error text-xs font-bold py-2 px-3 rounded-xl border border-error/20 flex items-center justify-center animate-pulse">
                                            <AlertCircle size={14} className="mr-1.5" />
                                            {errors.hora}
                                        </div>
                                    )}
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
                                                        <div className="flex-1 flex flex-col gap-2 animate-fade-in pl-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Inicio" value={formData.horario[dia].start} onChange={(val) => handleDayTimeChange(dia, 'start', val)} /></div>
                                                                <span className="text-on-surface-variant text-lg font-bold mx-1">:</span>
                                                                <div className="flex-1 min-w-[100px]"><TimePickerMD3 label="Fin" value={formData.horario[dia].end} onChange={(val) => handleDayTimeChange(dia, 'end', val)} /></div>
                                                            </div>
                                                            
                                                            {matrixErrors[dia] && (
                                                                <div className="mt-1 w-full bg-error/10 text-error text-[11px] font-bold py-2 px-3 rounded-xl border border-error/20 flex items-center justify-center animate-pulse">
                                                                    <AlertCircle size={12} className="mr-1.5 shrink-0" />
                                                                    {matrixErrors[dia]}
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
                                    <div id="field-startDate">
                                        <label className="block text-label-large font-bold mb-1.5">Inicio</label>
                                        <input type="date" value={formData.startDate} onChange={(e) => handleDateChange('startDate',e.target.value)} className={`input-outlined focus:bg-white ${errors.startDate?'border-error bg-error-container text-error':''}`}/>
                                        {errors.startDate && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.startDate}</p>}
                                    </div>
                                    <div id="field-endDate">
                                        <label className="block text-label-large font-bold mb-1.5">Cierre</label>
                                        <input type="date" value={formData.endDate} onChange={(e) => handleDateChange('endDate',e.target.value)} className={`input-outlined focus:bg-white ${errors.endDate?'border-error bg-error-container text-error':''}`}/>
                                        {errors.endDate && <p className="text-error text-xs mt-1 font-bold flex items-center animate-pulse"><AlertCircle size={12} className="mr-1"/>{errors.endDate}</p>}
                                    </div>
                                </>
                            )}
                            <div><label className="block text-label-large font-bold mb-1.5">Cupos / Vacantes</label><input type="number" min="1" value={formData.spots} onChange={(e) => setFormData({ ...formData, spots: e.target.value })} className="input-outlined text-center focus:bg-white" /></div>
                            <div className="pt-0"><label className="block text-label-large font-bold mb-1.5">Grupo WhatsApp (Opcional)</label><input type="url" value={formData.whatsappGroupLink} onChange={(e) => setFormData({ ...formData, whatsappGroupLink: e.target.value })} className="input-outlined focus:bg-white" placeholder="https://..." /></div>
                        </div>
                    </form>
                </div>
                <div className="flex gap-3 px-6 py-4 bg-surface border-t border-outline-variant/30 shrink-0 z-20">
                    <button type="button" onClick={onClose} className="btn-outlined flex-1 font-bold">Cancelar</button>
                    <button type="submit" form="convocation-form" className="btn-filled flex-1 font-bold shadow-primary/30 shadow-lg">
                        <Save className="w-4 h-4 mr-2" /> 
                        {convocation && convocation.id ? 'Guardar' : 'Publicar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminConvocationsPage() {
    const { getActiveConvocations, getClosedConvocations, fetchConvocations } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConvocation, setEditingConvocation] = useState(null);
    const [activeTab, setActiveTab] = useState('active');
    
    // 🟢 NUEVO: Estado del Snackbar
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'info' });
    const showMessage = (message, type = 'success') => setSnackbar({ show: true, message, type });

    // 🟢 NUEVO: Estado del ConfirmDialog
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', message: '', onConfirm: null, type: 'danger' });
    const showConfirm = (title, message, onConfirm, type = 'danger') => setConfirmDialog({ isOpen: true, title, message, onConfirm, type });
    const closeConfirm = () => setConfirmDialog(prev => ({ ...prev, isOpen: false }));

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

    const handleSave = async (data) => {
        try {
            if (editingConvocation && editingConvocation.id) {
                await actualizarConvocatoria(editingConvocation.id, data);
                showMessage("Convocatoria actualizada exitosamente", "success");
            } else {
                await crearConvocatoria(data);
                showMessage("¡Nueva convocatoria publicada!", "success");
            }
            setIsModalOpen(false); 
            setEditingConvocation(null); 
            await fetchConvocations();
        } catch (error) { showMessage("Error al guardar la convocatoria", "error"); }
    };

    const handleDelete = (id) => {
        showConfirm(
            'Eliminar Convocatoria', 
            '¿Estás seguro de que deseas eliminar esta convocatoria? Esta acción no se puede deshacer.', 
            async () => {
                closeConfirm();
                try { 
                    await eliminarConvocatoria(id); 
                    showMessage("Convocatoria eliminada", "error");
                    await fetchConvocations(); 
                } catch (error) { showMessage("Error al eliminar", "error"); }
            }
        );
    };

    const handleStatusChange = (id, status) => {
        let type = 'info';
        if (status === 'pausada') type = 'warning';
        if (status === 'cerrada') type = 'danger';

        showConfirm(
            'Cambiar Estado', 
            `¿Estás seguro de cambiar el estado a ${status.toUpperCase()}?`, 
            async () => {
                closeConfirm();
                try { 
                    await cambiarEstadoConvocatoria(id, status); 
                    showMessage(`Estado cambiado a ${status}`, type === 'danger' ? 'info' : type);
                    await fetchConvocations(); 
                } catch (error) { showMessage("Error al cambiar estado", "error"); }
            },
            type
        );
    };

    const handleReplicate = (convocation) => {
        const formData = mapBackendToForm(convocation);
        if(formData) {
            const replica = { 
                ...formData, id: null, title: `${formData.title} (Copia)`,
                startDate: '', endDate: '', fechaEvento: ''
            };
            setEditingConvocation(replica);
            setIsModalOpen(true);
            showMessage("Modifica los datos para crear la copia", "info");
        }
    };

    const handleEdit = (convocation) => {
        const formData = mapBackendToForm(convocation);
        if(formData) {
            setEditingConvocation(formData);
            setIsModalOpen(true);
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

    const renderEmptyState = () => {
        if (rawConvocations.length === 0) {
            if (activeTab === 'active') {
                return (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4"><Briefcase className="w-10 h-10 text-primary" /></div>
                        <h3 className="text-title-large text-on-surface font-bold mb-2">¡Comienza tu impacto!</h3>
                        <p className="text-body-large text-on-surface-variant max-w-md mb-6">Aún no tienes convocatorias activas. Crea una nueva oportunidad para que los voluntarios se sumen.</p>
                        <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled shadow-lg shadow-primary/20"><Plus className="w-5 h-5 mr-2" /> Crear Primera Convocatoria</button>
                    </div>
                );
            } else {
                return (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in opacity-70">
                        <Inbox className="w-16 h-16 text-on-surface-variant mb-4" />
                        <h3 className="text-title-medium text-on-surface font-bold">Historial Vacío</h3>
                        <p className="text-body-medium text-on-surface-variant">Aquí aparecerán las convocatorias que cierres o terminen.</p>
                    </div>
                );
            }
        } 
        if (paginatedConvocations.length === 0) {
            return (
                <div className="card text-center py-12 border-2 border-dashed border-outline-variant/50 bg-transparent animate-fade-in">
                    <Search className="w-12 h-12 text-on-surface-variant mx-auto mb-3 opacity-50" />
                    <h3 className="text-title-medium text-on-surface mb-1">No se encontraron resultados</h3>
                    <p className="text-body-small text-on-surface-variant">Intenta ajustar tu búsqueda o filtros.</p>
                    <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} className="btn-text mt-2 text-primary font-bold">Limpiar filtros</button>
                </div>
            );
        }
        return null;
    };

    return (
        <AdminLayout title="Gestión de Convocatorias" subtitle="Crea y administra las oportunidades.">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <div className="flex gap-2 bg-surface-container rounded-full p-1 w-fit">
                    <button onClick={() => setActiveTab('active')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Activas ({getActiveConvocations().length})</button>
                    <button onClick={() => setActiveTab('history')} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Historial ({getClosedConvocations().length})</button>
                </div>
                <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="btn-filled shadow-primary/20 hidden sm:flex"><Plus className="w-4 h-4" /> Nueva Convocatoria</button>
            </div>

            {rawConvocations.length > 0 && (
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
                                        <option value="all">Todos</option>
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
            )}

            <div className="space-y-4 pt-2 min-h-[400px]">
                {paginatedConvocations.length === 0 ? renderEmptyState() : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedConvocations.map(convocation => {
                            const isPublished = convocation.estado === 'abierta' || convocation.status === 'published';
                            
                            return (
                                <div key={convocation.id} className={`card-elevated flex flex-col h-full animate-fade-in group hover:-translate-y-1 transition-transform duration-300 ${activeTab === 'history' ? 'grayscale opacity-80 hover:grayscale-0 hover:opacity-100' : ''}`}>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            {getStatusBadge(convocation.estado || convocation.status)}
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm ${convocation.modalidad === 'virtual' ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
                                                {convocation.modalidad === 'virtual' ? <Video size={12}/> : <Home size={12}/>}
                                                {convocation.modalidad || 'Presencial'}
                                            </div>
                                        </div>

                                        <h3 className="text-title-medium font-bold text-on-surface mb-2 line-clamp-1">{convocation.title || convocation.titulo}</h3>
                                        <p className="text-body-small text-on-surface-variant line-clamp-2 mb-4 flex-1">{convocation.description || convocation.descripcion}</p>
                                        
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-on-surface-variant truncate">
                                                {convocation.modalidad === 'virtual' ? <Laptop size={16} className="text-indigo-500"/> : <MapPin size={16} className="text-orange-500"/>} 
                                                <span className="truncate">{convocation.location || convocation.ubicacion || (convocation.modalidad === 'virtual' ? 'Enlace de conexión' : 'Sede Principal')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-on-surface-variant"><Users size={16} className="text-primary"/> {convocation.spots || convocation.cupos_disponibles} cupos</div>
                                        </div>

                                        <div className="flex gap-2 mt-auto pt-3 border-t border-outline-variant/20">
                                            {activeTab === 'active' ? (
                                                <>
                                                    <button onClick={() => handleEdit(convocation)} className="btn-tonal py-2 flex-1 text-xs justify-center"><Edit size={16} className="mr-1"/> Editar</button>
                                                    {isPublished ? (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'pausada')} className="btn-outlined py-2 px-2 text-warning border-warning hover:bg-warning/10" title="Pausar"><Pause size={16}/></button>
                                                    ) : (
                                                        <button onClick={() => handleStatusChange(convocation.id, 'abierta')} className="btn-outlined py-2 px-2 text-success border-success hover:bg-success/10" title="Publicar"><Play size={16}/></button>
                                                    )}
                                                    <button onClick={() => handleStatusChange(convocation.id, 'cerrada')} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10" title="Terminar (Cerrar)"><Archive size={16}/></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleReplicate(convocation)} className="btn-tonal py-2 flex-1 text-xs justify-center bg-secondary-container text-secondary-on-container"><Copy size={16} className="mr-1"/> Replicar</button>
                                                    <button onClick={() => handleDelete(convocation.id)} className="btn-outlined py-2 px-2 text-error border-error hover:bg-error/10"><Trash2 size={16}/></button>
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

            {sortedConvocations.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-6 h-6 text-primary" /></button>
                    <span className="text-sm font-medium text-on-surface-variant">Página <span className="text-primary font-bold">{currentPage}</span> de {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-full hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-6 h-6 text-primary" /></button>
                </div>
            )}

            <button onClick={() => { setEditingConvocation(null); setIsModalOpen(true); }} className="sm:hidden fixed bottom-32 right-4 z-30 w-14 h-14 bg-primary text-white rounded-2xl shadow-elevation-4 flex items-center justify-center hover:bg-primary-dark active:scale-95 transition-transform"><Plus className="w-6 h-6" /></button>

            {isModalOpen && <ConvocationFormModal convocation={editingConvocation} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
            
            {/* 🟢 COMPONENTES VISUALES M3 */}
            <Snackbar show={snackbar.show} message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar({ ...snackbar, show: false })} />
            
            <ConfirmDialog 
                isOpen={confirmDialog.isOpen} 
                title={confirmDialog.title} 
                message={confirmDialog.message} 
                type={confirmDialog.type} 
                onConfirm={confirmDialog.onConfirm} 
                onCancel={closeConfirm} 
            />
        </AdminLayout>
    );
}